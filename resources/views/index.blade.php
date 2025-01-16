<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>VUE Project</title>
    @vite(['resources/js/app.js'])
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ URL::asset('css/menu.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/fontAwesome.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('css/components.css') }}">
    <link rel="stylesheet" href="{{ URL::asset('libs/select2/select2.min.css') }}">
</head>
<body>
    <div id="app">
        <main-template></main-template>
    </div>
    <script src="{{ URL::asset('libs/jquery/jquery.3.7.js') }}"></script>
    <script src="{{ URL::asset('js/script.js') }}"></script>
    <script src="{{ URL::asset('js/helpers.js') }}"></script>
    <script src="{{ URL::asset('libs/sweetalert2/sweetalert2-v11.js') }}"></script>
    <script src="{{ URL::asset('libs/select2/select2.min.js') }}"></script>
</body>
</html> 