export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Board {
  id: string;
  user_id: string;
  title: string;
  description: string;
  backdrop: string;
  type: string;
  is_started: boolean;
  is_closed: boolean;
  created_at: string;
}

export interface List {
  id: string;
  board_id: string;
  title: string;
  created_at: string;
}

export interface Task {
  id: string;
  list_id: string;
  title: string;
  description: string;
  status: boolean;
  due_date: string;
  created_at: string;
}

export interface Tag {
  id: string;
  task_id: string;
  content: string;
  color: string;
}
