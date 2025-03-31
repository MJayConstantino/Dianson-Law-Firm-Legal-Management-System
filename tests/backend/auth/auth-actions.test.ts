import {
    fetchUsersAction,
    signinAction,
    signOutAction,
    signUpAction,
} from "../../../src/actions/users";
import { createSupabaseClient } from "../../../src/utils/supabase/server";
import { z } from "zod";

// Mock the Supabase client
jest.mock("../../../src/utils/supabase/server", () => ({
    createSupabaseClient: jest.fn(() => ({
        auth: {
            signInWithPassword: jest.fn((email, password) => {
                console.log(email, password);
                return { error: null };
            }), // Ensure mock returns an object
            signUp: jest.fn(() => ({ error: null })), // Ensure mock returns an object
            signOut: jest.fn(() => ({ error: null })), // Ensure mock returns an object
            getSession: jest.fn(() => ({ data: { session: null } })), // Mock session as null initially
        },
        from: jest.fn(() => ({
            select: jest.fn(() => Promise.resolve({ data: null, error: null })), // Ensure mock returns an object
        })),
    })),
}));

const userSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
});

describe("Tests for Server Actions", () => {
    let supabaseMock: any;

    beforeEach(() => {
        supabaseMock = createSupabaseClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test.todo("should log sign in action");
    test.todo("should sign up user");
    test.todo("should sign out user otherwise do nothing if no session");
    test.todo("should fetch all users from the users table ");
});
