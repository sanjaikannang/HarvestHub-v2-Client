export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNo: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthState {
    user: null | {
        _id: string;
        name: string;
        email: string;
        role: string;
        phoneNo: string;
    };
    token: string | null;
    loading: boolean;
    error: string | null;
}