<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato de Adopción</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 20px;
            margin-top: 130px;
            margin-right: 130px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .logo {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid #333;
            object-fit: cover;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .section {
            margin-bottom: 15px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
            border-bottom: 1px solid #666;
            padding-bottom: 2px;
        }
        .field {
            display: inline-block;
            margin-right: 15px;
            margin-bottom: 5px;
        }
        .field-label {
            font-weight: bold;
        }
        .field-value {
            border-bottom: 1px solid #333;
            min-width: 100px;
            display: inline-block;
            padding-bottom: 1px;
        }
        .checkbox {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 1px solid #333;
            margin-right: 5px;
            text-align: center;
            line-height: 10px;
        }
        .clause {
            margin-bottom: 10px;
            text-align: justify;
        }
        .clause-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .signature-section {
            margin-top: 30px;
            display: table;
            width: 100%;
        }
        .signature-box {
            display: table-cell;
            width: 50%;
            padding: 10px;
            vertical-align: top;
        }
        .signature-line {
            border-bottom: 1px solid #333;
            height: 40px;
            margin-bottom: 5px;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <img src="{{ public_path('Asoc.jpg') }}" alt="Logo Asoc Amigos del Animal" class="logo">
    
    <div class="header">
        <div class="title">ASOC AMIGOS DEL ANIMAL</div>
        <div class="title">CONTRATO DE ADOPCIÓN RESPONSABLE: {{ $contract['tipo_adopcion'] }}</div>
        <div>Fecha: {{ $contract['fecha'] }}</div>
    </div>

    <div class="section">
        <div class="section-title">DATOS DEL ANIMAL ADOPTADO</div>
        <div class="field">
            <span class="field-label">Nombre:</span>
            <span class="field-value">{{ $pet->nombre }}</span>
        </div>
        <div class="field">
            <span class="field-label">Especie:</span>
            <span class="field-value">{{ $pet->tipo }}</span>
        </div>
        <div class="field">
            <span class="field-label">Sexo:</span>
            <span class="field-value">{{ $pet->genero }}</span>
        </div>
        <div class="field">
            <span class="field-label">Raza:</span>
            <span class="field-value">{{ $pet->raza }}</span>
        </div>
        <div class="field">
            <span class="field-label">Color:</span>
            <span class="field-value">{{ $pet->color }}</span>
        </div>
        <div class="field">
            <span class="field-label">Tamaño:</span>
            <span class="field-value">{{ $pet->tamaño }}</span>
        </div>
        <div class="field">
            <span class="field-label">Edad:</span>
            <span class="field-value">{{ $pet->edad }}</span>
        </div>
        <div class="field">
            <span class="field-label">Localidad:</span>
            <span class="field-value">_________________</span>
        </div>
        <div class="field">
            <span class="field-label">Vacunado:</span>
            <span class="checkbox">☐</span> Sí
            <span class="checkbox">☐</span> No
        </div>
        <div style="margin-top: 10px;">
            <span class="field-label">Estado de salud y cuidados especiales:</span>
            <div style="border: 1px solid #333; min-height: 40px; padding: 5px; margin-top: 5px;">
                {{ $pet->descripcion }}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">DATOS DEL ADOPTANTE</div>
        <div class="field">
            <span class="field-label">Sr./Sra.:</span>
            <span class="field-value">{{ $adoptante->nombre_completo }}</span>
        </div>
        <div class="field">
            <span class="field-label">DNI Nº:</span>
            <span class="field-value">{{ $adoptante->dni ?? '_________________' }}</span>
        </div>
        <div style="margin-top: 10px;">
            <div class="field-label">Domicilio:</div>
            <div class="field">
                <span class="field-label">Dirección:</span>
                <span class="field-value">{{ $adoptante->calle }} {{ $adoptante->direccion }}</span>
            </div>
            <div class="field">
                <span class="field-label">Nº:</span>
                <span class="field-value">{{ $adoptante->numero }}</span>
            </div>
            <div class="field">
                <span class="field-label">Piso:</span>
                <span class="field-value">{{ $adoptante->piso }}</span>
            </div>
            <div class="field">
                <span class="field-label">Puerta:</span>
                <span class="field-value">{{ $adoptante->puerta }}</span>
            </div>
        </div>
        <div class="field">
            <span class="field-label">Referencia del domicilio:</span>
            <span class="field-value">{{ $adoptante->referencia_domicilio }}</span>
        </div>
        <div class="field">
            <span class="field-label">Teléfonos:</span>
            <span class="field-value">{{ $adoptante->telefono }}</span> /
            <span class="field-value">_________________</span>
        </div>
        <div class="field">
            <span class="field-label">Correo electrónico:</span>
            <span class="field-value">{{ $adoptante->email }}</span>
        </div>
        <div class="field">
            <span class="field-label">Facebook:</span>
            <span class="field-value">{{ $adoptante->facebook }}</span>
        </div>
        <div style="margin-top: 15px; text-align: justify;">
            El/la adoptante, cuyos datos figuran en este documento, declara haber leído y aceptado los requisitos y cláusulas del presente contrato de adopción responsable.
        </div>
    </div>

    <div class="page-break"></div>

    <div class="section">
        <div class="section-title">REQUISITOS PARA LA ADOPCIÓN</div>
        <div class="clause">
            <strong>1.</strong> El/la adoptante deberá contar con vivienda propia, quedando excluidas viviendas temporales, prestadas o con riesgo de desalojo.
        </div>
        <div class="clause">
            <strong>2.</strong> El domicilio deberá encontrarse en un entorno seguro, en un barrio donde no exista un alto nivel de maltrato animal, peleas frecuentes, envenenamientos o abandono sistemático de animales.
        </div>
        <div class="clause">
            <strong>3.</strong> La entidad se reserva el derecho de no aprobar la adopción si considera que el entorno pone en riesgo la integridad física o emocional del animal.
        </div>
        <div class="clause">
            <strong>4.</strong> La adopción se realiza con el objetivo de brindar una vida digna y segura, no siendo suficiente la buena intención si el contexto no es adecuado.
        </div>
    </div>

    <div class="section">
        <div class="section-title">CLÁUSULAS</div>
        
        <div class="clause">
            <div class="clause-title">1ª. Bienestar y cuidados</div>
            El/la adoptante se compromete a mantener al animal en condiciones adecuadas para su bienestar, cumpliendo la normativa vigente en materia de protección animal. Se compromete a proporcionarle alimentación adecuada, cuidados diarios, paseos (si corresponde), atención, respeto y cariño. Asimismo, se compromete a llevar un control sanitario responsable del animal, incluyendo vacunación, desparasitación, revisiones veterinarias y atención inmediata en caso de enfermedad o accidente.
        </div>

        <div class="clause">
            <div class="clause-title">2ª. Esterilización</div>
            En caso de que el animal se entregue sin esterilizar, el/la adoptante se compromete a realizar la esterilización: Al cumplir seis (6) meses si es cachorro, o en un plazo máximo de dos (2) meses desde la adopción si es mayor de seis meses. Queda prohibido permitir la reproducción del animal o utilizarlo con fines económicos.
        </div>

        <div class="clause">
            <div class="clause-title">3ª. Seguimiento</div>
            El/la adoptante acepta y facilita las visitas de seguimiento que la entidad considere necesarias para verificar el correcto estado y bienestar del animal.
        </div>

        <div class="clause">
            <div class="clause-title">4ª. Retiro de custodia</div>
            La entidad ASOC AMIGOS DEL ANIMAL se reserva el derecho de retirar la custodia del animal si considera que no está siendo atendido adecuadamente o que su integridad corre peligro.
        </div>

        <div class="clause">
            <div class="clause-title">5ª. Prohibición de cesión</div>
            En ningún caso el/la adoptante podrá vender, regalar, abandonar, ceder o transferir el animal a terceros sin autorización expresa y por escrito de la entidad.
        </div>

        <div class="clause">
            <div class="clause-title">6ª. Responsabilidad legal</div>
            A partir de la firma del presente contrato, la responsabilidad civil y penal derivada del comportamiento del animal recaerá exclusivamente en el/la adoptante.
        </div>
    </div>

    <div class="page-break"></div>

    <div class="section">
        <div class="section-title">CLÁUSULA DE MULTAS, GASTOS Y COMPENSACIONES POR INCUMPLIMIENTO</div>
        
        <div class="clause">
            El/la adoptante acepta expresamente que el presente contrato es un compromiso serio y responsable con la vida y el bienestar del animal. En caso de retractación injustificada o devolución del animal, el/la adoptante deberá pagar y/o reembolsar lo siguiente:
        </div>

        <div class="clause">
            <strong>1. Costos de esterilización:</strong> Si el animal se entregó sin estar esterilizado, el/la adoptante asumirá el costo de la esterilización ya realizada, programada o pendiente.
        </div>

        <div class="clause">
            <strong>2. Costos de vacunación:</strong> El/la adoptante reembolsará los gastos de vacunación aplicados o programados para el animal.
        </div>

        <div class="clause">
            <strong>3. Compensación adicional:</strong> Una suma adicional de 
            <span class="checkbox">☐</span> <span class="field-value">{{ $contract['compensacion'] }}</span> Pesos Argentinos, 
            que cubrirá el impacto de la devolución innecesaria del animal, la pérdida de otras posibles adopciones exitosas y el estrés emocional y de traslado sufrido por el animal al haber cambiado de entorno sin motivo justificado.
        </div>

        <div class="clause">
            <strong>4. Multa por retractación:</strong> Si después de firmar este contrato el/la adoptante decide retractarse sin causa válida, deberá abonar una multa adicional de:
            <span class="checkbox">☐</span> <span class="field-value">{{ $contract['multa'] }}</span> Pesos Argentinos.
        </div>

        <div class="clause">
            <strong>Maltrato y abandono:</strong> El/la adoptante reconoce que está obligado/a a cuidar al animal en forma responsable y respetuosa, sin maltrato físico ni psicológico, ni abandono en ninguna circunstancia. Si se comprueba maltrato, abandono negligente o cualquier conducta que ponga en riesgo la salud o el bienestar del animal, el/la adoptante deberá:
        </div>

        <div class="clause" style="margin-left: 20px;">
            a) Entregar inmediatamente el animal a la entidad adoptante.<br>
            b) Abonar las sumas mencionadas en esta cláusula, incluidas las compensaciones y multas.
        </div>

        <div class="clause">
            Estas penalidades se establecen como medida de protección del animal y para incentivar el cumplimiento firme de las responsabilidades asumidas por el/la adoptante en este contrato.
        </div>
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div><strong>Por la entidad – Responsable de la mascota:</strong></div>
            <div class="signature-line"></div>
            <div>Nombre y firma: _________________________</div>
            <div>Fecha: {{ $contract['fecha'] }}</div>
        </div>
        <div class="signature-box">
            <div><strong>Adoptante:</strong></div>
            <div class="signature-line"></div>
            <div>Nombre y firma: {{ $adoptante->nombre_completo }}</div>
            <div>Fecha: {{ $contract['fecha'] }}</div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #666;">
        🐾 Este contrato se establece para garantizar el bienestar del animal y fomentar la adopción responsable 📝
    </div>
</body>
</html>