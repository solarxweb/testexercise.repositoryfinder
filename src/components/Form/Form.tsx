import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { FormikInitValue, Status } from "../../types/types";
import { Octokit } from "@octokit/core";
import { useDispatch, useSelector } from "react-redux";
import { addRepos, removeRepos, changeStatus } from "../../slices/profileSlice";
import { RequestError } from "@octokit/request-error";
import { useTranslation } from "react-i18next";

const Form = () => {
  const octokit = new Octokit({ });
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const prev = useRef<string>(null)
  const { t } = useTranslation();

  const status = useSelector((state: { profile:  { status: Status } } ) => state.profile.status)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik<FormikInitValue>({
  initialValues: {
    username: '',
    error: '',
  },
  onSubmit: async (values: { username: string }, { setSubmitting, setErrors }) => {
    if (prev.current && prev.current === values.username) {
      return;
    }
    prev.current = values.username;
    
    dispatch(removeRepos());
    dispatch(changeStatus('Loading'));
    try {
      setErrors({ error: '' });
      const response = await octokit.request(
        "GET /users/{username}/repos", 
        {
          username: values.username,
          per_page: 50,
        }
      );
      const { data } = response;
      if (response.status === 200) {
        if (data.length === 0) {
          setErrors({ error: t('errors.hasntPublicReps') });
        } else {
          data.forEach((repo) => {
            const { id, name, description, html_url, updated_at, stargazers_count } = repo;
            dispatch(addRepos({ id, name, description, html_url, updated_at, stargazers_count }));
          });
        }
      }
      dispatch(changeStatus('Success'));
    } catch (error: unknown) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 404:
            setErrors({ error: t('errors.notExist', { name: values.username })});
          break;
            case 403:
          setErrors({ error: t('errors.notYet') });
            break;
          default:
            setErrors({ error: 'Произошла ошибка при запросе' });
          break;
        }
        dispatch(changeStatus('Error'));
      }
    } finally {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = '';
      }
      sessionStorage.setItem('danya', 'bilo');
      setSubmitting(false);
      dispatch(changeStatus('Idle'));
    }
  },
});

  return (
    <div className='form-wrapper'>
      <form onSubmit={formik.handleSubmit}>
        <input
          id='username'
          name='username'
          type='text'
          placeholder={t('inputPlaceholder')}
          onChange={formik.handleChange}
          ref={inputRef}
          aria-label='Введи имя пользователя'
          autoComplete="off"
          required
        />
        <button
          type='submit'
          className='submit-btn'
          disabled={status !== Status.Idle}
        >
          {t('search')}
        </button>
      </form>
      {formik.errors.error && <div className='error-notice'>{formik.errors.error}</div>}
    </div>
  );
};

export default Form;