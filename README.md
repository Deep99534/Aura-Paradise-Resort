# Laravel Hotel/Resort Booking Management System

> **Internship Project Report & Source Code Repository**  
> Developed using **PHP 8.x** with the **Laravel Framework**.

---

## 📄 Internship Project Report

### ABSTRACT
The **Hotel/Resort Booking Management System** is a web application developed using the **Laravel PHP framework** to streamline the process of managing room/resort booking requests and tracking their status throughout the booking lifecycle. Traditional manual booking systems are prone to errors, double bookings, and poor visibility into request status. This project addresses these issues by providing a centralized system where guests (or front-desk staff) can raise booking requests, and administrators can approve, reject, or update the status of each booking (`Pending` → `Confirmed` → `Checked-In` → `Checked-Out` / `Cancelled`). The system uses Laravel's MVC architecture, Eloquent ORM for database interaction, Blade templating for the UI, and MySQL as the backend database.

---

### OBJECTIVE
1. To design and develop a web-based system for creating and managing hotel/resort booking requests.
2. To implement a **status-tracking mechanism** (`Pending`, `Confirmed`, `Checked-In`, `Checked-Out`, `Cancelled`) for every booking.
3. To provide an **admin dashboard** for managing rooms, guests, and bookings.
4. To apply **Laravel's MVC architecture** (Models, Views, Controllers), routing, and Eloquent ORM in a real-world scenario.
5. To ensure **data validation, security (CSRF protection, input validation)**, and a responsive UI using Blade + Bootstrap.
6. To auto-calculate stay durations and revenue metrics (`nights × price_per_night`).

---

### INTRODUCTION
The hospitality industry relies on efficient booking management to maximize occupancy and guest satisfaction. Manual registers or spreadsheet tracking often lead to overbooking, lost requests, and lack of real-time status visibility.

This project, **"Common Booking System for Hotel/Resort,"** is built using **PHP with the Laravel framework**, which offers:
- **MVC Architecture** — separates business logic, data, and presentation.
- **Eloquent ORM** — simplifies database operations using PHP syntax.
- **Blade Templating Engine** — enables reusable, dynamic HTML views.
- **Artisan CLI** — for migrations, seeders, and scaffolding.

---

### METHODOLOGY

#### Technology Stack
| Layer | Technology |
|---|---|
| Backend Language | PHP 8.x |
| Framework | Laravel 10.x / 11.x |
| Database | MySQL / SQLite |
| Frontend | Blade Templating, Bootstrap 5 |
| Web Server | XAMPP / Artisan Serve |

#### Database Schema
- **`rooms`**: `id`, `room_no`, `room_type`, `price_per_night`, `capacity`, `status`, `amenities`, `created_at`
- **`guests`**: `id`, `name`, `email`, `phone`, `address`, `created_at`
- **`bookings`**: `id`, `guest_id`, `room_id`, `check_in`, `check_out`, `total_amount`, `status`, `special_requests`, `created_at`

#### Booking Status Workflow
```
Pending → Confirmed → Checked-In → Checked-Out
              ↓
          Cancelled
```

---

## 📂 Project Directory Structure

```text
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── BookingController.php      # Main controller for CRUD & status logic
│   └── Models/
│       ├── Booking.php                     # Booking Eloquent Model
│       ├── Guest.php                       # Guest Eloquent Model
│       └── Room.php                        # Room Eloquent Model
├── database/
│   └── migrations/
│       ├── 2026_08_01_000001_create_rooms_table.php
│       ├── 2026_08_01_000002_create_guests_table.php
│       └── 2026_08_01_000003_create_bookings_table.php
├── resources/
│   └── views/
│       ├── layouts/
│       │   └── app.blade.php              # Main Bootstrap layout
│       └── bookings/
│           ├── index.blade.php            # Booking listing & status tracker view
│           ├── create.blade.php           # New booking request form
│           └── show.blade.php             # Detailed summary view
├── routes/
│   └── web.php                            # Web application routes
├── composer.json                          # PHP dependencies file
└── README.md
```

---

## 💻 Code Implementation Highlights

### 1. Booking Controller Status Syncing Logic (`app/Http/Controllers/BookingController.php`)
```php
public function updateStatus(Request $request, Booking $booking)
{
    $validated = $request->validate([
        'status' => 'required|in:pending,confirmed,checked_in,checked_out,cancelled'
    ]);

    $booking->status = $validated['status'];
    $booking->save();

    // Automatic room status synchronization
    if ($validated['status'] === 'checked_in') {
        $booking->room->update(['status' => 'occupied']);
    } elseif (in_array($validated['status'], ['checked_out', 'cancelled'])) {
        $booking->room->update(['status' => 'available']);
    }

    return back()->with('success', 'Booking status updated successfully!');
}
```

---

## 🚀 Setup & Installation Guide

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Deep99534/Aura-Paradise-Resort.git
   cd Aura-Paradise-Resort
   ```

2. **Install PHP Dependencies**:
   ```bash
   composer install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database Configuration (`.env`)**:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=hotel_booking
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Database Migrations**:
   ```bash
   php artisan migrate
   ```

6. **Serve the Application**:
   ```bash
   php artisan serve
   ```
   Open `http://127.0.0.1:8000` in your web browser.

---

## 🎯 CONCLUSION
The **Laravel Hotel/Resort Booking Management System** demonstrates how a modern PHP framework can be used to build a structured, maintainable, and scalable booking solution. By leveraging Laravel's MVC architecture, Eloquent ORM, and Blade templating, the system efficiently handles booking creation, guest & room management, and real-time status tracking (`Pending`, `Confirmed`, `Checked-In`, `Checked-Out`, `Cancelled`).
