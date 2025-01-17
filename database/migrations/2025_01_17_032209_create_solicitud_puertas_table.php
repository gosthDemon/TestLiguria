<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicitud_puertas', function (Blueprint $table) {
            $table->id();
            $table->string('modelo');
            $table->string('ancho');
            $table->string('alto');
            $table->string('um')->comment('Unidad de medida')->default('In');
            $table->string('precio');
            $table->string("status")->default("1");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitud_puertas');
    }
};
