// src/access.ts
export default function access(initialState: { currentUser?: UserContext.BaseInfo | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser,
  };
}
