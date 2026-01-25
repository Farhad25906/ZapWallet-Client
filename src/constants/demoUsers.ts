// Demo user credentials for quick testing
export const DEMO_USERS = {
    user: {
        phone: "+8801829313336",
        pin: "123456",
        role: "USER",
        name: "Demo User",
    },
    agent: {
        phone: "+8801760744906",
        pin: "123456",
        role: "AGENT",
        name: "Demo Agent",
    },
    admin: {
        phone: "+8801812345678",
        pin: "123456",
        role: "SUPER_ADMIN",
        name: "Demo Admin",
    },
} as const;

export type DemoUserType = keyof typeof DEMO_USERS;
