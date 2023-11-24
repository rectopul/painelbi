export interface FacebookPagesPayload {
    pages:      FacebookPages;
    id:         number;
    token:      string;
    unic_code:  string;
    name:       string;
    status:     string;
    created_at: Date;
    updated_at: Date;
}

export interface FacebookPages {
    data:   FacebookPagesData[];
    paging: Paging;
}

export interface FacebookPagesData {
    access_token:  string;
    category:      string;
    category_list: CategoryList[];
    name:          string;
    id:            string;
    tasks:         string[];
    posts: FacePostsList;
    
}

export interface FacePostsList {
    posts: FacePosts;
    id: string;
}

export interface FacePosts {
    data: FacePostsData[];
    paging: Paging;
}

export interface FacePostsData {
    created_time: string;
    message?: string;
    id: string;
    story?: string;
}

export interface CategoryList {
    id:   string;
    name: string;
}

export interface Paging {
    cursors: Cursors;
}

export interface Cursors {
    before: string;
    after:  string;
}
