Segue um prompt estruturado em inglês, pronto para usar em IA de desenvolvimento/design:

```text
You are a senior product designer and full-stack developer. Build a complete, responsive, mobile-first pet healthcare management system inspired by the attached visual references.

The system must work primarily as a mobile-first web app/PWA, but it must also be fully responsive for tablets and desktops. Before coding each major feature, analyze the requirement, implement it cleanly, and verify that the feature works correctly.

Project name: Faro

General concept:
Faro is a digital pet health wallet for pet owners. The system helps tutors manage pet vaccines, veterinary appointments, medication reminders, health history, and adoption opportunities nearby.

The main goal is to help pet owners remember what their pets already took, what is pending, what is scheduled, and what needs attention.

Visual identity and UI style:
Use the attached reference images as the main visual guide.

Design direction:
- Mobile-first interface.
- Friendly, colorful, pet-focused aesthetic.
- Main color: vibrant orange.
- Secondary color: warm brown.
- Backgrounds in light cream/off-white.
- Rounded cards and buttons.
- Soft shadows.
- Paw pattern details.
- Large pet photos and playful onboarding screens.
- Clean, readable typography.
- Friendly but organized layout.
- Use icons for pets, vaccines, calendar, medication, clinic, adoption, settings, and profile.
- Bottom navigation on mobile.
- Responsive sidebar or top navigation for desktop.
- Dark mode and light mode support.

Mandatory responsiveness:
The entire system must be responsive. Start designing for mobile screens first, then adapt to tablet and desktop. Do not create layouts that only work on desktop.

Core modules:

1. Authentication
Create the following screens:
- Onboarding screens with pet images, paw patterns, orange background, and short phrases.
- Login screen.
- Create account screen.
- Forgot password flow.
- Profile setup after registration.

Create account form fields:
- First name.
- Last name.
- Email.
- Phone.
- CPF.
- Password.
- Confirm password.

Login form fields:
- Email.
- Password.
- Forgot password link.
- Create account button.

Validation requirements:
- Validate required fields.
- Validate email format.
- Validate password and confirm password match.
- Validate CPF format visually.
- Validate phone format visually.
- Show friendly error messages.

2. Home dashboard
Create a home page similar to the reference layout.

The home page must show:
- User greeting with name.
- Profile/avatar area.
- Notification bell with badge.
- Registered pets section.
- Add pet button.
- Upcoming vaccines section.
- Upcoming appointments section.
- Medication reminders section.
- Nearby veterinary clinics section.
- Adoption call-to-action section.
- Bottom navigation menu.

The dashboard must prioritize what needs attention soon:
- Vaccines pending.
- Vaccines scheduled.
- Medication due today.
- Appointments scheduled.
- Overdue tasks.

3. Pet registration
The user can register up to 3 pets.

Pet fields:
- Pet name.
- Pet type: dog, cat, bird, fish, hamster, rabbit, other.
- Breed.
- Gender.
- Birth date.
- Calculated age based on birth date.
- Photo upload.
- Weight, optional.
- Comorbidities or health conditions, optional.
- Notes, optional.

Rules:
- Maximum of 3 pets per account.
- If the user already has 3 pets, disable the add pet action and show a friendly message.
- After registering a pet, generate the recommended vaccine list based on pet type and age.
- The system must allow editing and deleting pet information.

Verification:
After implementing this module, verify:
- A user cannot register more than 3 pets.
- Age is calculated correctly from birth date.
- Optional fields do not block registration.
- Pet image upload works or has a clear placeholder.

4. Vaccine wallet
This is the main feature of the system.

When the tutor adds a pet, the system must automatically suggest vaccines based on:
- Pet type.
- Age/life stage.
- Previously registered vaccines.

For each vaccine, the tutor must be able to mark it as:
- Pending.
- Taken.
- Scheduled.

Vaccine record fields:
- Vaccine name.
- Recommended age or period.
- Status: pending, taken, scheduled.
- Date taken.
- Scheduled date.
- Veterinary clinic, optional.
- Veterinarian name, optional.
- Batch/lot number, optional.
- Notes, optional.
- Next dose date, when applicable.

Behavior:
- If a vaccine is marked as taken, move it to vaccine history.
- If a vaccine is scheduled, show it in the agenda and reminders.
- If a vaccine is pending, keep it visible as pending until marked as taken or scheduled.
- If a vaccine date is close, show alerts.
- If a vaccine is overdue, show a clear visual warning.

Important:
Use sample vaccine schedule data for dogs and cats. For other pet types, create a generic customizable vaccine/health reminder flow. Add a note that vaccine schedules are informational and must be confirmed by a veterinarian.

Verification:
After implementing this module, verify:
- Vaccine suggestions appear after pet registration.
- Status changes work correctly.
- Taken vaccines appear in history.
- Scheduled vaccines appear in agenda.
- Pending vaccines remain visible.
- Alerts appear close to the scheduled date.

5. Veterinary appointments
Create a module for veterinary consultations.

The tutor must be able to add appointments with:
- Pet.
- Appointment date.
- Appointment time.
- Reason for visit.
- Location or clinic.
- Veterinarian name, optional.
- Medication prescribed: yes/no.
- Medication details, optional.
- Observations.
- Appointment status: scheduled, completed, canceled.

Behavior:
- Scheduled appointments appear in the agenda.
- Completed appointments appear in the consultation history.
- The user can edit or cancel appointments.
- The dashboard must show the next appointments.

Verification:
After implementation, verify:
- Appointments can be created, edited, completed, and canceled.
- Completed appointments appear in history.
- Scheduled appointments appear in the dashboard and agenda.

6. Medication reminders
Create a medication management module.

When adding medication, the tutor must enter:
- Pet.
- Medication name.
- Dosage, optional.
- Frequency: every X hours or specific times of day.
- Duration in days.
- Start date.
- End date automatically calculated based on duration.
- Must be taken while fasting: yes/no.
- Medication type: pill, liquid, injection, topical, other.
- Reason for medication.
- Observations.

Behavior:
- The system must generate medication reminder times.
- Show reminders on dashboard and agenda.
- Notify when it is time to take medication.
- Notify when the medication treatment period is ending.
- Mark each dose as taken, skipped, or pending.
- Stop reminders after the end date.

Verification:
After implementation, verify:
- End date is calculated correctly.
- Medication reminders are generated based on frequency.
- Medication appears in the agenda.
- Medication stops after the treatment period.
- Dose statuses work correctly.

7. Agenda
Create a unified agenda/calendar page.

The agenda must show:
- Vaccines scheduled.
- Veterinary appointments.
- Medication reminders.
- Overdue tasks.
- Today’s tasks.
- Upcoming tasks.

Views:
- Today.
- Week.
- Month.
- List view.

Each item must clearly show:
- Pet name.
- Type of event.
- Date and time.
- Status.
- Action button.

Verification:
After implementation, verify:
- Vaccines, appointments, and medications appear in the same agenda.
- Filters by pet and event type work.
- Overdue items are visually clear.

8. Notifications and alerts
Create a notification system for:
- Vaccine scheduled soon.
- Vaccine overdue.
- Appointment reminder.
- Medication reminder.
- Medication treatment ending.
- Pet health task pending.

For now, use in-app notifications. If building as a PWA, prepare the structure for future push notifications.

Notification behavior:
- Show notification badge.
- Notification list page.
- Mark as read.
- Mark all as read.
- Delete notification.

Verification:
After implementation, verify:
- Notification badge updates.
- Notifications are created based on scheduled events.
- Read/unread status works.

9. Adoption module
Create an adoption page accessible from the bottom navbar.

The menu must include a call-to-action:
“Algum animal que precisa de adoção?”

Adoption page features:
- List animals available for adoption near the user’s region.
- Use location-based filtering if location is available.
- If location is not available, allow manual city/state search.
- Any user can publish an animal for adoption.

Adoption post fields:
- Animal name, optional.
- Animal type.
- Breed, optional.
- Gender.
- Approximate age.
- Photo.
- Description.
- City.
- State.
- Contact name.
- Contact phone or email.
- Adoption status: available, in process, adopted.

Behavior:
- Users can create adoption posts.
- Users can browse adoption posts.
- Users can filter by animal type, city, state, and status.
- Show a friendly empty state when there are no animals nearby.

Verification:
After implementation, verify:
- Adoption posts can be created.
- Adoption posts appear in the list.
- Filters work correctly.
- Location fallback works when user location is unavailable.

10. Nearby veterinary clinics
Create a section to show nearby veterinary clinics.

For prototype/mock version:
- Use mock clinic data.
- Show clinic image, name, distance, address, and action button.

For production-ready structure:
- Prepare the code to integrate with a maps/location API later.

Verification:
- Clinics appear on the home page.
- “View more” opens a complete clinics page.
- Cards are responsive.

11. Settings page
Create a settings page with:
- Profile settings.
- Accessibility settings.
- Change password.
- Light mode/dark mode toggle.
- Notification preferences.
- Pet limit information.
- Logout button.

Accessibility settings:
- Increase font size.
- High contrast mode.
- Reduce animations.
- Better readable spacing.

Verification:
- Theme toggle works.
- Accessibility options change the UI.
- Change password form validates correctly.

12. Navigation
Mobile bottom navigation must include:
- Home.
- Vaccines/Health wallet.
- Pets.
- Agenda.
- Adoption.
- Settings/Menu.

Desktop navigation:
- Adapt the bottom navigation into a sidebar or top navigation.
- Keep the same information architecture.

13. Data structure
Create clean data models for:
- User.
- Pet.
- Vaccine.
- VaccineRecord.
- Appointment.
- Medication.
- MedicationDose.
- Notification.
- AdoptionPost.
- Clinic.

Use mock data if no backend is available, but structure the code as if it can be connected to an API later.

14. Required pages
Implement at least the following pages:
- Onboarding.
- Login.
- Register.
- Forgot password.
- Home dashboard.
- My pets.
- Add/Edit pet.
- Pet details.
- Vaccine wallet.
- Vaccine history.
- Add/Edit vaccine record.
- Veterinary appointments.
- Appointment history.
- Medication reminders.
- Add/Edit medication.
- Agenda.
- Notifications.
- Adoption list.
- Add adoption post.
- Nearby clinics.
- Settings.

15. UX requirements
The system must be easy for a non-technical pet owner.

Use:
- Clear labels.
- Friendly empty states.
- Confirmation modals for destructive actions.
- Toast messages for successful actions.
- Loading states.
- Error states.
- Simple explanations.
- Icons and color indicators.

Status colors:
- Green: completed/taken/scheduled successfully.
- Orange: pending/upcoming.
- Red: overdue/canceled/attention needed.
- Gray: inactive/empty/default.

16. Final quality checks
After finishing the implementation, perform a full review and confirm:

Responsiveness:
- Works on mobile.
- Works on tablet.
- Works on desktop.
- No layout breaks.
- Bottom navigation works on mobile.
- Desktop navigation works properly.

Feature checks:
- User can register and log in.
- User can add up to 3 pets.
- Vaccine suggestions are generated based on pet type and age.
- Vaccine statuses work.
- Vaccine history works.
- Appointments work.
- Medication reminders work.
- Agenda consolidates all scheduled items.
- Notifications work.
- Adoption module works.
- Settings work.
- Theme mode works.
- Accessibility options work.

Code quality:
- Components are organized.
- Forms are validated.
- Data models are clear.
- Mock data is separated from UI logic.
- UI is consistent with the visual references.
- No duplicated unnecessary code.
- No broken routes.
- No console errors.

Important delivery instruction:
Do not create only static screens. The system must have real interactive flows, even if using mock/local data. Prioritize a complete working prototype with clean structure, responsive layout, and realistic user experience.
```
