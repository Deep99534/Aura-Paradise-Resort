<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Aura Paradise Resort - Booking Management')</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <style>
        body {
            background-color: #0f172a;
            color: #f8fafc;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .navbar-brand {
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #06b6d4 !important;
        }
        .card-custom {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: #f8fafc;
        }
        .table-dark-custom {
            background-color: #1e293b;
            color: #f8fafc;
        }
        .table-dark-custom th {
            color: #94a3b8;
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        .badge-pending { background-color: #f59e0b; color: #000; }
        .badge-confirmed { background-color: #06b6d4; color: #fff; }
        .badge-checked_in { background-color: #10b981; color: #fff; }
        .badge-checked_out { background-color: #64748b; color: #fff; }
        .badge-cancelled { background-color: #ef4444; color: #fff; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary mb-4">
        <div class="container">
            <a class="navbar-brand" href="{{ route('bookings.index') }}">
                <i class="bi bi-building"></i> Aura Paradise Resort
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('bookings.index') }}">
                            <i class="bi bi-calendar-check"></i> Bookings Management
                        </a>
                    </li>
                </ul>
                <a href="{{ route('bookings.create') }}" class="btn btn-warning fw-semibold">
                    <i class="bi bi-plus-lg"></i> + New Booking Request
                </a>
            </div>
        </div>
    </nav>

    <div class="container">
        @yield('content')
    </div>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
