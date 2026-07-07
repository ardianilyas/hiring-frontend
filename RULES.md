````markdown
# React Project Structure Template (AI Agent Instructions)

## Role

You are a senior React engineer.

Your goal is to generate maintainable, scalable, feature-based React applications.

Always prioritize:

- Readability
- Separation of concerns
- Reusability
- Testability
- Small files
- Predictable architecture

---

# Core Rules

## 1. Feature-based Architecture

Never organize by file type.

✅ Correct

```
src/
    app/
    shared/
    features/
        auth/
        users/
        dashboard/
```

❌ Wrong

```
components/
pages/
hooks/
api/
utils/
```

Everything should belong to a feature whenever possible.

---

## 2. Maximum File Size

Hard limit:

- 300 LOC per file

Preferred:

- 100–200 LOC

If a file exceeds 250 lines, automatically split it.

---

## 3. One Responsibility Per File

Bad

```
UserPage.tsx

- fetching
- filtering
- modal
- table
- form
- mutation
```

Good

```
UserPage.tsx
UserTable.tsx
UserToolbar.tsx
UserModal.tsx
UserForm.tsx
useUsers.ts
useCreateUser.ts
```

---

# Folder Structure

```
src/
│
├── app/
│   ├── router/
│   ├── providers/
│   ├── layouts/
│   └── App.tsx
│
├── shared/
│   ├── api/
│   │   ├── axios.ts
│   │   └── queryClient.ts
│   │
│   ├── components/
│   │   ├── Button/
│   │   ├── Modal/
│   │   ├── Table/
│   │   └── Input/
│   │
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   └── lib/
│
├── features/
│
│   ├── users/
│   │
│   │   ├── api/
│   │   │   ├── getUsers.ts
│   │   │   ├── createUser.ts
│   │   │   ├── updateUser.ts
│   │   │   └── deleteUser.ts
│   │
│   │   ├── hooks/
│   │   │   ├── useUsers.ts
│   │   │   ├── useCreateUser.ts
│   │   │   ├── useUpdateUser.ts
│   │   │   └── useDeleteUser.ts
│   │
│   │   ├── components/
│   │   │   ├── UserTable.tsx
│   │   │   ├── UserForm.tsx
│   │   │   ├── UserModal.tsx
│   │   │   └── UserToolbar.tsx
│   │
│   │   ├── pages/
│   │   │   └── UserPage.tsx
│   │
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   └── auth/
│       ...
│
└── main.tsx
```

---

# Component Rules

Each component should only do ONE thing.

Example

```
UserPage

    renders layout

UserTable

    renders table

UserToolbar

    renders filters/buttons

UserModal

    modal wrapper

UserForm

    form only
```

Never combine all of them.

---

# Data Fetching

Always use TanStack Query.

Never fetch inside components using useEffect.

Bad

```tsx
useEffect(() => {
    fetch(...)
}, [])
```

Good

```tsx
const { data } = useUsers()
```

---

# Query Structure

```
features/
    users/
        api/
            getUsers.ts

        hooks/
            useUsers.ts
```

Example

```tsx
// api/getUsers.ts

export const getUsers = async () => {
    ...
}
```

```tsx
// hooks/useUsers.ts

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })
}
```

---

# Mutation Structure

```
api/
    createUser.ts

hooks/
    useCreateUser.ts
```

```tsx
export function useCreateUser() {
    return useMutation({
        mutationFn: createUser,
    })
}
```

Invalidate queries inside hooks.

Never inside components.

Example

```tsx
const queryClient = useQueryClient()

return useMutation({
    mutationFn: createUser,
    onSuccess() {
        queryClient.invalidateQueries({
            queryKey: ["users"],
        })
    },
})
```

---

# API Layer

All HTTP requests belong inside `/api`.

Never call axios/fetch directly inside components.

Good

```
api/getUsers.ts
```

Bad

```tsx
const data = await axios.get(...)
```

inside component.

---

# Form Rules

Always use:

- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for connecting RHF and Zod

Structure

```
users/
    schema.ts
    components/
        UserForm.tsx
```

Validation belongs in `schema.ts`. Never inline validation in components.

Example `schema.ts`:

```ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

export type UserFormValues = z.infer<typeof userSchema>;
```

Example `UserForm.tsx`:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormValues } from '../schema';

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

# Types

Keep types close to features.

```
users/
    types.ts
```

Only global types belong in

```
shared/types
```

---

# Business Logic

Move business logic into hooks.

Bad

```tsx
const filtered = users.filter(...)
```

inside component.

Good

```
useFilteredUsers.ts
```

---

# Shared Components

Reusable UI goes into

```
shared/components
```

Examples

- Button
- Modal
- Card
- Dialog
- Spinner
- Table
- Badge

Feature-specific UI stays inside feature.

---

# Import Rules

Prefer

```
shared/...

features/users/...
```

Avoid deep relative imports.

Bad

```
../../../../hooks
```

---

# Barrel Exports

Each folder should expose

```
index.ts
```

Example

```
components/

UserForm.tsx
UserTable.tsx
index.ts
```

```ts
export * from "./UserForm";
export * from "./UserTable";
```

---

# Naming

Components

```
UserTable.tsx
```

Hooks

```
useUsers.ts
```

API

```
getUsers.ts
updateUser.ts
deleteUser.ts
```

Types

```
User
UserDto
UserForm
```

Interfaces are discouraged.

Prefer

```ts
type User = {}
```

---

# State Management

Priority

1. TanStack Query (server state)
2. React state
3. Context
4. Zustand (only if necessary)

Avoid global state unless required.

---

# Component Template

```tsx
type Props = {

}

export function UserTable({
    ...
}: Props) {

    ...

    return (
        ...
    )
}
```

---

# Hook Template

```tsx
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    })
}
```

---

# Page Template

A page should:

- compose components
- call hooks
- own layout

It should NOT:

- contain API logic
- contain filtering logic
- contain mutation logic
- contain validation

---

# AI Generation Rules

When generating code:

1. Follow feature-based architecture.
2. Never exceed 300 LOC per file.
3. Automatically split large components.
4. Keep API, hooks, UI, schemas, and types separate.
5. Use TanStack Query for all server state.
6. Use React Hook Form + Zod for forms.
7. Keep components presentational whenever possible.
8. Put business logic into custom hooks.
9. Put HTTP requests into the API layer.
10. Use barrel exports (`index.ts`).
11. Use TypeScript with `type` instead of `interface`.
12. Prefer composition over large components.
13. Avoid prop drilling by extracting context only when necessary.
14. Avoid unnecessary abstractions—only extract when reused or improving clarity.
15. Keep imports clean and avoid deep relative paths.
16. Ensure generated code is production-ready, consistent, and easy to maintain.
````
