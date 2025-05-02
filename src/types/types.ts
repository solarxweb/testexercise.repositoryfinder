export interface FormikInitValue {
  username: string,
  error: string,
}

export type Repo = {
  id: number,
  name: string,
  description?: string | null,
  html_url: string,
  updated_at: string,
  stargazers_count: number,
}


export enum Status {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error'
}

export type InitialState = {
  entities: Repo[],
  status: Status,
}