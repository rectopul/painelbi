import { FacebookProfiles } from "@prisma/client";

export class CreateFacebookDto { }

export interface FacebookPageToken {
    data: FacePageTokenData[];
    paging: Paging;
}

export interface FacePageTokenData {
    access_token: string;
    category: string;
    category_list: CategoryList[];
    name: string;
    id: string;
    tasks: string[];
}


export interface FacebookAccount {
    name: string;
    id: string;
}


export interface FacebookPagesPayload extends FacebookProfiles {
    pages: FacebookPagesListMain
}

export interface FacebookPagesListMain {
    data: FacebookDataPages[];
    paging: Paging;
}

export interface FacebookDataPages {
    access_token: string;
    category: string;
    category_list: CategoryList[];
    name: string;
    id: string;
    tasks: string[];
    posts: FacePostsList;
}

export interface CategoryList {
    id: string;
    name: string;
}

export interface Paging {
    cursors: Cursors;
}

export interface Cursors {
    before: string;
    after: string;
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



