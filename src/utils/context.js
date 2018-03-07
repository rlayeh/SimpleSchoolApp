export const getContext = () => `/${process.env.CONTEXT_PATH || ''}/api`.replace(/\/{2,}|\/$/g, '/');
