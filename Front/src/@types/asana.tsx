export interface AsanaTasksMain {
    data: DataTaskMain[];
}

export interface DataTaskMain {
    gid:              string;
    name:             string;
    resource_type:    string;
    resource_subtype: string;
}

export interface TaskMain {
    data: DataTask;
}

export interface DataTask {
    gid:                 string;
    actual_time_minutes: null;
    assignee:            null;
    assignee_status:     string;
    completed:           boolean;
    completed_at:        null;
    created_at:          Date;
    custom_fields:       any[];
    due_at:              null;
    due_on:              null;
    followers:           ParentTask[];
    hearted:             boolean;
    hearts:              any[];
    liked:               boolean;
    likes:               any[];
    memberships:         any[];
    modified_at:         Date;
    name:                string;
    notes:               string;
    num_hearts:          number;
    num_likes:           number;
    parent:              ParentTask;
    permalink_url:       string;
    projects:            any[];
    resource_type:       string;
    start_at:            null;
    start_on:            null;
    tags:                any[];
    resource_subtype:    string;
    workspace:           ParentTask;
}

export interface ParentTask {
    gid:               string;
    name:              string;
    resource_type:     string;
    resource_subtype?: string;
}

export interface ProjectMain {
    data: SectionMain[];
}

export interface SectionMain {
    gid:           string;
    name:          string;
    resource_type: string;
}

export interface TaskListMain {
    data:      Task[];
    next_page: NextPage | null;
}

export interface Task {
    gid:              string;
    name:             string;
    resource_type:    string;
    resource_subtype: string;
}

export interface NextPage {
    offset: string;
    path:   string;
    uri:    string | null;
}

export interface ResponseTask {
    name: string
    tasks: TaskListMain
}


