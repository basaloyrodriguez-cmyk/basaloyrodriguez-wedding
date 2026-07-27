# Technical Specification & Overview: Basalo & Rodriguez Wedding Invitation

This is a digital wedding invitation application constructed with a responsive, modern glassmorphism design (Champagne, Dusty Rose, and Deep Wine color palette) using React, Vite, and Supabase.

---

## 1. Architecture & Tech Stack
*   **Frontend**: React (Vite-based) + Vanilla CSS (located in `src/index.css` for structural layout and theme variables).
*   **Icons**: `lucide-react`
*   **Database & API Backend**: Supabase (JS client version 2)
*   **Email Deliverability**: Resend (triggered securely via a Supabase Edge Function).

---

## 2. Supabase Database Schema
The system maps guests and handles RSVPs using three main tables:

### `invitados` (Guests)
Stores individual guest contact records and RSVP state.
```sql
CREATE TABLE invitados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255),
    asistira BOOLEAN, -- NULL (Pending), TRUE (Attending), FALSE (Declined)
    correo_confirmacion_enviado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `parentesco_invitados` (Relationships / Companions)
Maps a primary guest to companion guests so they can confirm attendance as a unified party/group.
```sql
CREATE TABLE parentesco_invitados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitado_principal_id UUID REFERENCES invitados(id) ON DELETE CASCADE,
    invitado_acompanante_id UUID REFERENCES invitados(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### `roles_boda` & `invitado_roles` (wedding roles)
Handles special roles assigned to guests (e.g., Bridesmaid / Dama de Honor).
```sql
CREATE TABLE roles_boda (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_rol VARCHAR(255) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE invitado_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitado_id UUID REFERENCES invitados(id) ON DELETE CASCADE,
    rol_id UUID REFERENCES roles_boda(id) ON DELETE CASCADE
);
```

### `mensajes_rol` (Personalized pop-ups for roles)
Stores emotional messages and custom pictures dynamically retrieved for guests with specific roles.
```sql
CREATE TABLE mensajes_rol (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rol_id UUID REFERENCES roles_boda(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    picture_name VARCHAR(255), -- References local assets (e.g., 'mate.jpg')
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 3. Core Features & UX Flows

### 1. The Digital Envelope (`src/components/CoverPage.jsx`)
*   Provides a clean initial lookup state.
*   Contains the `GuestSearchInput` component. On mount it fetches the name index once (`id, nombre, apellido` only — no emails reach the browser) and filters it locally with `src/utils/guestSearch.js`. A guest is only listed when the typed text matches **both** one of their given names and one of their surnames, so typing a single word (or a stray letter) never reveals the guest list. Matching ignores case and accents, accepts word prefixes, and tolerates one typo per word (≥4 chars). The full record (`correo`, `asistira`) is fetched by `id` on selection.
*   Includes validation safety triggers that disable background search updates once a name is clicked to avoid "No result" pop-ups post-selection.
*   Retrieves the selected guest's companion linkages and special roles/messages.

### 2. Personalized Role Modal (`src/components/ui/RoleModal.jsx`)
*   If the selected guest is linked to a record in `mensajes_rol` (such as a *Dama de Honor*), an styled modal pops up immediately after opening the envelope.
*   Renders dynamic local assets (like `src/assets/mate.jpg`) matching the name returned in `picture_name`.

### 3. Invitation Screen & RSVP (`src/components/RSVPSection.jsx`)
*   Displays event details, a countdown timer, and styled Venue cards with custom images.
*   **Attendance State**: Prompts the user with "Sí, asistiré" or "No podré asistir".
*   **Companion RSVP**: When confirming, the user can toggle confirmation for their linked table companions. The interface loads the companions' past attendance records, displaying state badges like `(Ya confirmado)` or `(Rechazado)`.

### 4. Supabase Edge Function (`wedding-email`)
*   When a guest submits the form, the frontend triggers the Edge function at `https://mllalnskldvhncmeixvd.supabase.co/functions/v1/wedding-email` using `supabase.functions.invoke()`.
*   It securely executes a POST request to Resend containing the guest's email and template variables, bypassing frontend CORS blocks and protecting the Resend API key.
*   On successful email transmission, it updates the `correo_confirmacion_enviado` flag in the DB.
