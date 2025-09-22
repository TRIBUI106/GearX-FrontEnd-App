export interface User {
    user_id: number,
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    full_name: string,
    created_at: string,
    updated_at: string,
    created_by: string,
    updated_by: string,
    is_active: number,
    is_deleted: number,
    avatar_url: string
}