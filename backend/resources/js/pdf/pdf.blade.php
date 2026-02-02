<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contrato de Adopción - {{ $adopcion->codigo ?? 'BORRADOR' }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 11px; /* Letra pequeña legal estándar */
            line-height: 1.4;
            color: #000;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        h1 { font-size: 16px; margin: 0; text-transform: uppercase; }
        h2 { font-size: 13px; background-color: #f0f0f0; padding: 5px; border-bottom: 1px solid #ccc; margin-top: 15px; margin-bottom: 5px; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        td { padding: 4px; vertical-align: top; }
        .label { font-weight: bold; width: 120px; }
        .value { border-bottom: 1px dotted #999; } /* Simula la línea de escritura */
        
        .checkbox-container { display: inline-block; margin-right: 15px; }
        .checkbox {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 1px solid #000;
            text-align: center;
            line-height: 10px;
            font-size: 10px;
            margin-right: 4px;
        }

        .clausulas { margin-left: 0; padding-left: 20px; }
        .clausulas li { margin-bottom: 8px; text-align: justify; }
        
        .highlight-box {
            border: 1px solid #000;
            padding: 10px;
            background-color: #fafafa;
            margin-top: 10px;
            page-break-inside: avoid; /* Evita que se corte a mitad de página */
        }

        .signatures { margin-top: 50px; width: 100%; page-break-inside: avoid; }
        .sign-box { text-align: center; width: 45%; }
        .sign-line { border-top: 1px solid #000; margin-top: 40px; padding-top: 5px; }

        .footer { position: fixed; bottom: 0; left: 0; right: 0; font-size: 9px; text-align: center; color: #666; }
    </style>
</head>
<body>

    <div class="header">
        <h1>ASOC AMIGOS DEL ANIMAL</h1>
        <p><strong>CONTRATO DE ADOPCIÓN RESPONSABLE:</strong> {{ $adopcion->codigo ?? '_____' }}</p>
        <p>
            Fecha: {{ now()->format('d') }} / {{ now()->format('m') }} / {{ now()->format('Y') }} &nbsp;&nbsp;|&nbsp;&nbsp;
            Tipo de adopción: {{ $adopcion->tipo ?? 'Definitiva' }}
        </p>
    </div>

    <h2>DATOS DEL ANIMAL ADOPTADO</h2>
    <table>
        <tr>
            <td class="label">Nombre:</td>
            <td class="value">{{ $animal->nombre }}</td>
            <td class="label">Especie:</td>
            <td class="value">{{ $animal->especie }}</td>
        </tr>
        <tr>
            <td class="label">Sexo:</td>
            <td class="value">{{ $animal->sexo }}</td>
            <td class="label">Raza:</td>
            <td class="value">{{ $animal->raza ?? 'Mestizo' }}</td>
        </tr>
        <tr>
            <td class="label">Color:</td>
            <td class="value">{{ $animal->color }}</td>
            <td class="label">Tamaño:</td>
            <td class="value">{{ $animal->tamano }}</td>
        </tr>
        <tr>
            <td class="label">Edad aprox:</td>
            <td class="value">{{ $animal->edad }}</td>
            <td class="label">Localidad:</td>
            <td class="value">{{ $animal->ubicacion ?? 'Jujuy' }}</td>
        </tr>
        <tr>
            <td class="label">Vacunado:</td>
            <td>
                <span class="checkbox">{{ $animal->vacunado ? 'X' : '&nbsp;' }}</span> Sí &nbsp;&nbsp;
                <span class="checkbox">{{ !$animal->vacunado ? 'X' : '&nbsp;' }}</span> No
            </td>
        </tr>
        <tr>
            <td class="label">Salud/Cuidados:</td>
            <td colspan="3" class="value">{{ $animal->descripcion_salud ?? 'Sin cuidados especiales reportados al momento de la entrega.' }}</td>
        </tr>
    </table>

    <h2>DATOS DEL ADOPTANTE</h2>
    <table>
        <tr>
            <td class="label">Sr./Sra.:</td>
            <td colspan="3" class="value">{{ $adoptante->nombre }} {{ $adoptante->apellido }}</td>
        </tr>
        <tr>
            <td class="label">DNI Nº:</td>
            <td class="value">{{ $adoptante->dni }}</td>
            <td class="label">Mayor de edad:</td>
            <td>Sí</td>
        </tr>
        <tr>
            <td class="label">Domicilio:</td>
            <td colspan="3" class="value">
                {{ $adoptante->direccion }} {{ $adoptante->altura }}
                @if($adoptante->piso) Piso: {{ $adoptante->piso }} @endif
                @if($adoptante->depto) Puerta: {{ $adoptante->depto }} @endif
            </td>
        </tr>
        <tr>
            <td class="label">Referencia:</td>
            <td colspan="3" class="value">{{ $adoptante->referencia_domicilio }}</td>
        </tr>
        <tr>
            <td class="label">Teléfonos:</td>
            <td class="value">{{ $adoptante->telefono }} / {{ $adoptante->telefono_alternativo }}</td>
        </tr>
        <tr>
            <td class="label">Email:</td>
            <td class="value">{{ $adoptante->email }}</td>
            <td class="label">Facebook:</td>
            <td class="value">{{ $adoptante->facebook ?? '________________' }}</td>
        </tr>
    </table>

    <p style="margin: 15px 0; font-style: italic; text-align: center;">
        El/la adoptante declara haber leído y aceptado los requisitos y cláusulas del presente contrato.
    </p>

    <h2>REQUISITOS PARA LA ADOPCIÓN</h2>
    <ol class="clausulas">
        <li>El/la adoptante deberá contar con vivienda propia, quedando excluidas viviendas temporales, prestadas o con riesgo de desalojo.</li>
        <li>El domicilio deberá encontrarse en un entorno seguro (sin historial de maltrato zonal, envenenamientos, etc.).</li>
        <li>La entidad se reserva el derecho de no aprobar la adopción si considera que el entorno es riesgoso.</li>
        <li>La adopción busca brindar una vida digna; la buena intención no basta si el contexto no es adecuado.</li>
    </ol>

    <h2>CLÁUSULAS</h2>
    <ol class="clausulas" type="1">
        <li><strong>Bienestar y cuidados:</strong> Compromiso de alimentación, paseos, respeto y control sanitario (vacunas, veterinaria).</li>
        <li><strong>Esterilización:</strong> 
            @if($animal->castrado)
                El animal se entrega YA esterilizado.
            @else
                Compromiso de esterilizar a los 6 meses (cachorros) o en 2 meses máximo (adultos). Prohibida la reproducción.
            @endif
        </li>
        <li><strong>Seguimiento:</strong> Se aceptan visitas de la entidad para verificar el estado del animal.</li>
        <li><strong>Retiro de custodia:</strong> La Asociación puede retirar al animal si detecta negligencia o peligro.</li>
        <li><strong>Prohibición de cesión:</strong> Prohibido vender, regalar o abandonar. Solo se devuelve a la Asociación.</li>
        <li><strong>Responsabilidad legal:</strong> La responsabilidad civil/penal es exclusiva del adoptante desde la firma.</li>
    </ol>

    <div class="highlight-box">
        <h3 style="margin-top:0; text-align:center;">CLÁUSULA DE MULTAS, GASTOS Y COMPENSACIONES</h3>
        <p>En caso de retractación injustificada, devolución o maltrato, el adoptante deberá abonar:</p>
        <ul>
            <li><strong>Costos Veterinarios:</strong> Reembolso de esterilización y vacunas realizadas o programadas.</li>
            <li>
                <strong>Compensación Adicional:</strong> 
                <span class="checkbox">{{ isset($multas['compensacion']) ? 'X' : '&nbsp;' }}</span> 
                $ {{ number_format($multas['compensacion'] ?? 0, 0, ',', '.') }} ARS.
                <br><small>(Cubre impacto de devolución, pérdida de oportunidades y estrés del animal).</small>
            </li>
            <li>
                <strong>Multa por Retractación:</strong> 
                <span class="checkbox">{{ isset($multas['retractacion']) ? 'X' : '&nbsp;' }}</span>
                $ {{ number_format($multas['retractacion'] ?? 0, 0, ',', '.') }} ARS.
            </li>
        </ul>
        <p style="font-size: 10px;">
            <strong>Maltrato y Abandono:</strong> Si se comprueba maltrato, se deberá entregar el animal inmediatamente y abonar todas las multas mencionadas.
        </p>
    </div>

    <table class="signatures">
        <tr>
            <td class="sign-box">
                <div class="sign-line">
                    <strong>POR LA ENTIDAD</strong><br>
                    ASOC. AMIGOS DEL ANIMAL<br>
                    Fecha: ____/____/______
                </div>
            </td>
            <td style="width: 10%;"></td>
            <td class="sign-box">
                <div class="sign-line">
                    <strong>EL ADOPTANTE</strong><br>
                    Firma y Aclaración<br>
                    Fecha: ____/____/______
                </div>
            </td>
        </tr>
    </table>

    <div class="footer">
        Documento generado digitalmente por el sistema de gestión de Amigos del Animal - {{ now()->year }}
    </div>

</body>
</html>