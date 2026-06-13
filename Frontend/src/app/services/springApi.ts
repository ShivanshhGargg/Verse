const API_BASE = import.meta.env.VITE_SPRING_API_URL || 'http://localhost:8080/api';

export interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        age: number;
        gender: string;
    };
}

export async function signup(data: SignupData): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Signup failed');
    }
    return res.json();
}

export async function login(data: LoginData): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Login failed');
    }
    return res.json();
}