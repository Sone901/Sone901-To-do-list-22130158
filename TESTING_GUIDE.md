# 🧪 Testing Guide - Todo List Application

## Test Prerequisites

- [ ] Node.js 14+ installed
- [ ] MongoDB Atlas account (or local)
- [ ] Application running at `http://localhost:4000`
- [ ] Modern browser (Chrome, Firefox, etc)
- [ ] Two browsers or incognito mode available

---

## TEST 1: Email/Password Authentication

### Test 1.1 - Registration
**Objective**: Verify registration works correctly

**Steps**:
1. Access `http://localhost:4000`
2. Click "Register"
3. Fill in:
   - Name: "Test User 1"
   - Email: "test1@example.com"
   - Password: "Test@123"
4. Click "Register"

**Expected Result**:
- ✅ Success message or redirect to login
- ✅ User created in MongoDB
- ✅ Password is hashed (not plaintext)

**Validation Test**:
1. Try registering again with same email
2. System should reject (unique email)

---

### Test 1.2 - Login with Email/Password
**Objective**: Verify email/password authentication

**Steps**:
1. Click "Login"
2. Fill in:
   - Email: "test1@example.com"
   - Password: "Test@123"
3. Click "Login"

**Expected Result**:
- ✅ Redirect to `/dashboard`
- ✅ Navbar shows user name
- ✅ User avatar displayed
- ✅ Session created

**Negative Test**:
1. Try login with wrong password
2. System should return error
3. Does not redirect to dashboard

---

### Test 1.3 - Google OAuth
**Objective**: Verify Google authentication

**Steps**:
1. Click "Login with Google"
2. Select your Google account
3. Authorize application
4. Wait for redirect

**Expected Result**:
- ✅ Redirect to `/dashboard`
- ✅ User created automatically if new
- ✅ Google avatar loaded
- ✅ Email confirmed

---

### Test 1.4 - Logout
**Objective**: Verify logout works

**Steps**:
1. Click avatar in top right corner
2. Click "Logout"
3. Confirm in dialog
4. Wait for redirect

**Expected Result**:
- ✅ Redirects to `/login`
- ✅ Session destroyed (F5 goes to login, not dashboard)
- ✅ User data does not persist

---

## TEST 2: CRUD - Tasks

### Test 2.1 - Create Task
**Objective**: Verify task creation

**Steps**:
1. Login as Test User 1
2. Click "Add New Task"
3. Fill form:
   - Task: "Complete project"
   - Description: "Finish the todo app"
   - Category: "Work"
   - Date: 2025-12-15
   - Time: 14:00
4. Click "Add Task"

**Expected Result**:
- ✅ Modal closes
- ✅ Task appears in "Today" tab
- ✅ Data displays correctly
- ✅ Task saved in MongoDB
- ✅ Creator = Test User 1

**Additional Test**:
1. Create 3 tasks with different categories
2. Create 1 task for future date
3. Verify they appear in correct tabs

---

### Test 2.2 - Read Tasks
**Objective**: Verify task display

**Steps**:
1. Be on dashboard with tasks
2. Verify "Today" tab shows:
   - Task title
   - Description
   - Date
   - Category
3. Click checkbox for a task
4. Verify "Completed" tab shows:
   - Same task with strikethrough
   - "Completed" badge
   - Reduced opacity

**Expected Result**:
- ✅ All information displays correctly
- ✅ Tabs show appropriate tasks
- ✅ Styles applied correctly
- ✅ Sidebar shows task count per category

---

### Test 2.3 - Edit Task
**Objective**: Verify task editing

**Steps**:
1. Click edit icon (blue pencil) on task
2. Edit modal opens
3. Verify pre-fill:
   - [ ] Title is correct
   - [ ] Description is correct
   - [ ] Category is correct
   - [ ] Date is correct
4. Modify:
   - Title: "Complete project - Updated"
   - Date: 2025-12-20
5. Click "Update Task"

**Expected Result**:
- ✅ Modal closes
- ✅ Task updates on dashboard
- ✅ Modified data reflects correctly
- ✅ Date updates in display
- ✅ Changes save to MongoDB

---

### Test 2.4 - Delete Task
**Objective**: Verify task deletion

**Steps**:
1. Click delete icon (red trash) on task
2. Confirm in "Are you sure?" dialog
3. Click "OK"

**Expected Result**:
- ✅ Task disappears from dashboard
- ✅ Task removed from MongoDB
- ✅ No "undo" (permanent deletion)
- ✅ Category task count updates

**Negative Test**:
1. Click delete
2. Click "Cancel"
3. Task is not deleted

---

### Test 2.5 - Mark Completed
**Objective**: Verify status toggle

**Steps**:
1. Pending task in "Today" tab
2. Click checkbox on left
3. Observe task movement

**Expected Result**:
- ✅ Task moves to "Completed" tab
- ✅ Strikethrough applied
- ✅ "Completed" badge appears
- ✅ Reduced opacity

**Reverse Test**:
1. Go to "Completed" tab
2. Click checkbox on completed task
3. Task returns to "Today" tab
4. Strikethrough and badge disappear

---

## TEST 3: Search, Filter and Sort

### Test 3.1 - Search
**Objective**: Verify search functionality

**Setup**:
- Create tasks:
  1. "Buy groceries" (description: "milk, bread")
  2. "Call mom" (description: "check on her")
  3. "Finish report" (description: "project analysis")

**Steps - Search by Title**:
1. Type "Buy" in search field
2. Observe tasks filter

**Expected Result**:
- ✅ Only "Buy groceries" appears
- ✅ Other tasks disappear (display: none)
- ✅ Filter is case-insensitive
- ✅ Real-time search (as you type)

**Steps - Search by Description**:
1. Clear previous search
2. Type "milk"
3. Observe "Buy groceries" appears
4. Other tasks disappear

**Expected Result**:
- ✅ Search works in description too
- ✅ Task with "milk" in description appears

**Steps - Clear Search**:
1. Click "X" in search field
2. Observe all tasks reappear

**Expected Result**:
- ✅ Field becomes empty
- ✅ X button disappears
- ✅ All tasks visible again

---

### Test 3.2 - Filter by Deadline
**Objective**: Verify deadline filtering

**Setup**:
- Create tasks with different dates:
  1. Today: 2025-12-14
  2. This Week: 2025-12-16
  3. This Month: 2025-12-25
  4. Overdue: 2025-12-10 (past)

**Steps - Filter Today**:
1. Select "Today" in Deadline dropdown
2. Verify only today's task appears

**Steps - Filter This Week**:
1. Select "This Week"
2. Tasks for next 7 days appear

**Steps - Filter This Month**:
1. Select "This Month"
2. Tasks for current month appear

**Steps - Filter Overdue**:
1. Select "Overdue"
2. Only tasks with past date appear

**Expected Result**:
- ✅ Each filter shows appropriate tasks
- ✅ Dates compared correctly
- ✅ Filter combines with search if present

---

### Test 3.3 - Sorting
**Objective**: Verify sorting functionality

**Setup**:
- Create tasks with different dates:
  1. "Apple" - 2025-12-20
  2. "Zebra" - 2025-12-10
  3. "Banana" - 2025-12-15

**Steps - Sort by Deadline**:
1. Select "By Deadline"
2. Verify order: Zebra, Banana, Apple

**Expected Result**:
- ✅ Tasks ordered by date (ascending)
- ✅ Nearest dates first

**Steps - Sort by Title**:
1. Select "By Title"
2. Verify order: Apple, Banana, Zebra

**Expected Result**:
- ✅ Tasks in alphabetical order
- ✅ Case-insensitive

**Steps - Sort by Created Date**:
1. Select "By Created Date"
2. Returns to original order

---

## TEST 4: Data Isolation per User

### Test 4.1 - Two Different Accounts
**Objective**: Verify users cannot see each other's tasks

**Setup**:
1. Create 2 accounts:
   - test1@example.com / "Test User 1"
   - test2@example.com / "Test User 2"

**Steps**:
1. Login as Test User 1
2. Create tasks:
   - "Task A1"
   - "Task A2"
3. Logout
4. Login as Test User 2
5. Observe dashboard

**Expected Result**:
- ✅ Test User 2 does not see "Task A1" or "Task A2"
- ✅ Dashboard empty or only Test User 2 tasks
- ✅ Create "Task B1" for Test User 2
- ✅ Back to Test User 1, does not see "Task B1"

---

### Test 4.2 - Unauthorized Access Attempt
**Objective**: Verify protection against unauthorized access

**Requirements**:
- IDs of tasks from different users
- Dev Tools (F12)

**Steps**:
1. Login as Test User 1
2. Open Dev Tools (F12)
3. Go to Network/Console
4. Copy ID of Test User 1's task
5. Logout
6. Login as Test User 2
7. Try manually to edit/delete Test User 1's task

**Expected Result**:
- ✅ Error 403 (Forbidden)
- ✅ Task is NOT edited/deleted
- ✅ System returns appropriate error
- ✅ Logs show unauthorized attempt

---

## TEST 5: Category Filter

### Test 5.1 - Filter by Project
**Objective**: Verify category filtering

**Setup**:
- Create tasks in categories:
  1. Work: "Report", "Meeting"
  2. Personal: "Gym", "Read book"
  3. Shopping: "Milk", "Bread"
  4. Others: "Clean", "Organize"

**Steps**:
1. Click "Work" in sidebar
2. Verify only Work tasks appear
3. Click "Personal"
4. Verify only Personal tasks appear
5. Click "All" or click again to reset

**Expected Result**:
- ✅ Category filter works
- ✅ Visual indicator shows active category
- ✅ Combines with search/filter/sort
- ✅ Count updates dynamically

---

## TEST 6: Interface & Visual

### Test 6.1 - Responsive Design
**Objective**: Verify adaptation to different sizes

**Steps**:
1. Desktop (1920x1080): Verify 3-column layout
2. Tablet (768x1024): Verify layout adapts
3. Mobile (375x812): Verify layout stacks
4. Resize window gradually

**Expected Result**:
- ✅ Layout adapts at all sizes
- ✅ Text readable
- ✅ Buttons clickable
- ✅ Modals responsive

---

### Test 6.2 - Dark/Light Mode
**Objective**: Verify theme support

**Steps**:
1. On Windows: Settings > Personalization > Colors
2. Toggle between Dark and Light
3. Reload page (F5)
4. Verify application follows preference

**Expected Result**:
- ✅ Dark mode: dark background, light text
- ✅ Light mode: light background, dark text
- ✅ Smooth transition between themes
- ✅ All components follow theme

---

### Test 6.3 - Animations
**Objective**: Verify animations work

**Steps**:
1. Hover over task item
2. Observe hover effect
3. Add task - observe slide in
4. Edit task - observe modal animation
5. Delete task - observe fade out

**Expected Result**:
- ✅ Smooth animations
- ✅ No lag or stuttering
- ✅ Appropriate transitions

---

## TEST 7: User Profile

### Test 7.1 - Edit Profile
**Objective**: Verify personal data editing

**Steps**:
1. Click avatar > Profile
2. Edit name: "Test User Updated"
3. Edit email: "test1updated@example.com"
4. Click "Save"

**Expected Result**:
- ✅ Data updates in database
- ✅ Navbar reflects new name
- ✅ Avatar updates if photo changed
- ✅ Email remains unique (cannot duplicate)

---

### Test 7.2 - Avatar Upload
**Objective**: Verify image upload

**Steps**:
1. Click avatar > Profile
2. Tab "Upload from Device"
3. Drag or select image
4. Observe preview update
5. Click "Save"

**Expected Result**:
- ✅ Image uploads
- ✅ Saved in `/assets/uploads`
- ✅ Preview shows correctly
- ✅ Avatar in navbar updates
- ✅ Supports JPEG, PNG, GIF, WebP
- ✅ Rejects > 5MB

**URL Test**:
1. Tab "Image URL"
2. Paste image URL
3. Click "Load"
4. Preview loads
5. Click "Save"

**Expected Result**:
- ✅ Online image loads
- ✅ Preview updates
- ✅ URL validated
- ✅ Avatar in navbar updates

---

## TEST 8: Edge Cases & Errors

### Test 8.1 - No Authentication
**Objective**: Verify route protection

**Steps**:
1. Open new incognito/private tab
2. Try accessing `http://localhost:4000/dashboard`

**Expected Result**:
- ✅ Redirects to `/login`
- ✅ No data access

---

### Test 8.2 - Session Expired
**Objective**: Verify behavior after expiration

**Steps**:
1. Login normally
2. Wait ~30 minutes (or edit SESSION_SECRET)
3. Try to perform action (create/edit/delete task)

**Expected Result**:
- ✅ Error or redirect to login
- ✅ Data not updated
- ✅ Session destroyed

---

### Test 8.3 - Invalid Data
**Objective**: Verify form validation

**Steps**:
1. Click "Add New Task"
2. Leave title empty
3. Click "Add Task"

**Expected Result**:
- ✅ Required field prevents submit
- ✅ Browser shows validation
- ✅ No server request

---

### Test 8.4 - Lost Connection
**Objective**: Verify behavior without internet

**Steps** (Network Throttling):
1. Open Dev Tools (F12)
2. Network tab > Throttle > Offline
3. Try creating task
4. Go back online

**Expected Result**:
- ✅ Error shown to user
- ✅ Can retry when online

---

## TEST 9: Performance

### Test 9.1 - Many Tasks
**Objective**: Verify performance with many tasks

**Setup**:
- Create 100+ tasks (via script/loop)

**Steps**:
1. Open Dev Tools (F12) > Performance
2. Dashboard loads
3. Observe performance metrics
4. Test search/filter/sort
5. Test edit/delete

**Expected Result**:
- ✅ Load < 3 seconds
- ✅ Search/filter < 500ms
- ✅ No freezing
- ✅ Smooth scrolling

---

## TEST 10: Browser Compatibility

### Test per Browser
**Objective**: Verify compatibility

**Browsers**:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Tests in each browser**:
1. Registration
2. Login
3. Create/edit/delete task
4. Search/filter/sort
5. Profile
6. Dark/light mode

**Expected Result**:
- ✅ Works in all modern browsers
- ✅ Responsive layouts
- ✅ No critical console errors

---

## 📊 Test Report

### Documentation Format
```
| Test | Result | Notes | Date |
|------|--------|-------|------|
| 1.1 Registration | ✅ PASS | Works | 2025-12-14 |
| 1.2 Login | ✅ PASS | Google OK | 2025-12-14 |
| ... | | | |
```

---

## 🎯 Success Criteria

**ALL tests must pass (✅)**:
- ✅ Authentication (Email + Google)
- ✅ CRUD (Create, Read, Update, Delete)
- ✅ Search working
- ✅ Filter working
- ✅ Sort working
- ✅ Data isolation per user
- ✅ No security errors
- ✅ Responsive interface
- ✅ Dark/Light mode
- ✅ Acceptable performance

If all pass: **APPLICATION READY FOR PRODUCTION ✅**

---

**Creation Date**: December 14, 2025
**Version**: 1.0
**Status**: Ready for Testing

---
