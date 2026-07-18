KERNEL_DATA.addNote({
    id: 1,
    section: 'notes',
    title: 'Модель угроз: кто атакует, как и зачем',
    desc: 'Четыре типа нарушителей, векторы атак, MITRE ATT&CK, Cyber Kill Chain, модель ФСТЭК, Zero Trust и стратегии защиты.',
    tags: ['теория', 'база', 'ФСТЭК', 'MITRE', 'STRIDE'],
    date: 'Сентябрь 2026',
    content: function() {
        return [
            '<h3>Почему модель угроз — это первый шаг</h3>',
            '<p>Нельзя защищаться от всего. Ресурсы всегда ограничены. <strong>Модель угроз</strong> отвечает на три вопроса:</p>',
            '<ul>',
            '<li><strong>Кто</strong> может атаковать?</li>',
            '<li><strong>Что</strong> они хотят получить?</li>',
            '<li><strong>Как</strong> они могут это сделать?</li>',
            '</ul>',
            '<p>Ответив на них, вы строите <strong>эшелонированную защиту</strong> — не одну стену, а несколько рубежей. Без модели угроз вы защищаетесь от всего и ни от чего одновременно.</p>',

            '<h3>Формула оценки риска</h3>',
            '<div style="background:var(--bg-secondary);padding:16px;border-radius:8px;margin:16px 0;text-align:center;font-size:16px;">',
            '<strong>Риск = Вероятность × Ущерб</strong>',
            '</div>',
            '<p>Где <strong>вероятность</strong> — насколько легко нарушителю реализовать угрозу, а <strong>ущерб</strong> — какие потери понесёт организация при успешной атаке. На практике используется матрица рисков 3×3 или 5×5 для приоритизации мер защиты.</p>',

            '<h3>Методологии моделирования угроз</h3>',

            '<h3>STRIDE (Microsoft)</h3>',
            '<p>Акроним по типам угроз. Применяется при проектировании ПО:</p>',
            '<ul>',
            '<li><strong>S</strong>poofing — подмена личности.</li>',
            '<li><strong>T</strong>ampering — подмена данных.</li>',
            '<li><strong>R</strong>epudiation — отказ от действия.</li>',
            '<li><strong>I</strong>nformation Disclosure — утечка информации.</li>',
            '<li><strong>D</strong>enial of Service — отказ в обслуживании.</li>',
            '<li><strong>E</strong>levation of Privilege — повышение привилегий.</li>',
            '</ul>',

            '<h3>MITRE ATT&CK</h3>',
            '<p>База знаний о тактиках и техниках злоумышленников. 14 тактик, более 200 техник. Используется для Threat Hunting, Red Team / Blue Team упражнений и построения карты покрытия защиты.</p>',
            '<p>Ссылка: <a href="https://attack.mitre.org" target="_blank">attack.mitre.org</a></p>',

            '<h3>Cyber Kill Chain (Lockheed Martin)</h3>',
            '<p>7 этапов целевой атаки: Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives. Цель защиты — разорвать цепочку на как можно более раннем этапе.</p>',

            '<h3>Четыре типа нарушителей</h3>',

            '<h3>1. Скрипт-кидди</h3>',
            '<p>Новички без глубоких знаний. Используют готовые эксплоиты, сканеры, брутфорсеры. Мотивация — любопытство и самоутверждение. Опасность низкая, но массовость создаёт шум в логах.</p>',
            App.createCodeBlock(
                '# Словарный брутфорс — типичный инструмент скрипт-кидди\n' +
                'import hashlib\n\n' +
                'target = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"\n' +
                'passwords = ["admin", "123456", "password", "qwerty"]\n\n' +
                'for pwd in passwords:\n' +
                '    if hashlib.sha256(pwd.encode()).hexdigest() == target:\n' +
                '        print(f"Найден: {pwd}")\n' +
                '        break',
                'python'
            ),

            '<h3>2. Инсайдер</h3>',
            '<p>Сотрудник с легитимным доступом. Самый опасный тип — уже внутри периметра. Классификация: злонамеренный, небрежный (до 60% инцидентов), скомпрометированный. Защита: Least Privilege, DLP, UEBA, регулярный пересмотр доступа.</p>',

            '<h3>3. Киберпреступная группировка</h3>',
            '<p>Организованные группы с разделением ролей. Бизнес-модели: Ransomware-as-a-Service (RaaS), Initial Access Broker, Phishing-as-a-Service. Тактика двойного вымогательства: кража данных → шифрование → публикация при отказе платить.</p>',

            '<h3>4. APT (Advanced Persistent Threat)</h3>',
            '<p>Государственные группы. Высочайшая квалификация, zero-day уязвимости, присутствие в сети месяцы и годы (среднее — 287 дней). Реальные атаки: Stuxnet (2010), SolarWinds (2020).</p>',

            '<h3>Сравнительная таблица</h3>',
            '<div style="overflow-x:auto;margin:16px 0;">',
            '<table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left;">',
            '<thead><tr style="border-bottom:2px solid var(--border);">',
            '<th style="padding:8px 10px;">Параметр</th><th style="padding:8px 10px;">Скрипт-кидди</th><th style="padding:8px 10px;">Инсайдер</th><th style="padding:8px 10px;">Кибергруппа</th><th style="padding:8px 10px;">APT</th>',
            '</tr></thead><tbody>',
            '<tr style="border-bottom:1px solid var(--border);"><td style="padding:6px 10px;font-weight:600;">Квалификация</td><td style="padding:6px 10px;">Низкая</td><td style="padding:6px 10px;">Разная</td><td style="padding:6px 10px;">Высокая</td><td style="padding:6px 10px;">Высочайшая</td></tr>',
            '<tr style="border-bottom:1px solid var(--border);"><td style="padding:6px 10px;font-weight:600;">Мотивация</td><td style="padding:6px 10px;">Любопытство</td><td style="padding:6px 10px;">Месть / Деньги</td><td style="padding:6px 10px;">Деньги</td><td style="padding:6px 10px;">Геополитика</td></tr>',
            '<tr style="border-bottom:1px solid var(--border);"><td style="padding:6px 10px;font-weight:600;">Ресурсы</td><td style="padding:6px 10px;">Никакие</td><td style="padding:6px 10px;">Доступ в ИС</td><td style="padding:6px 10px;">Инструменты</td><td style="padding:6px 10px;">Государство</td></tr>',
            '<tr style="border-bottom:1px solid var(--border);"><td style="padding:6px 10px;font-weight:600;">Обнаружение</td><td style="padding:6px 10px;">Лёгкое</td><td style="padding:6px 10px;">Среднее</td><td style="padding:6px 10px;">Сложное</td><td style="padding:6px 10px;">Очень сложное</td></tr>',
            '<tr><td style="padding:6px 10px;font-weight:600;">Ущерб</td><td style="padding:6px 10px;">Минимальный</td><td style="padding:6px 10px;">$1-15 млн</td><td style="padding:6px 10px;">$1-100 млн</td><td style="padding:6px 10px;">$100M+</td></tr>',
            '</tbody></table></div>',

            '<h3>Модель нарушителя по ФСТЭК России</h3>',
            '<ul>',
            '<li><strong>Н1 — Базовый:</strong> общедоступные средства. → Скрипт-кидди.</li>',
            '<li><strong>Н2 — Базовый повышенный:</strong> доступ пользователя. → Инсайдер.</li>',
            '<li><strong>Н3 — Средний:</strong> доступ администратора, спецсредства. → Профессионалы.</li>',
            '<li><strong>Н4 — Высокий:</strong> zero-day, доступ к исходному коду. → APT.</li>',
            '</ul>',

            '<h3>Zero Trust</h3>',
            '<p>Принцип: <strong>«Никогда не доверяй, всегда проверяй».</strong> Три столпа: Verify Explicitly, Least Privilege, Assume Breach.</p>',

            '<h3>Ключевые выводы</h3>',
            '<ul>',
            '<li>Модель угроз — живой документ, пересматривается регулярно.</li>',
            '<li>Самый опасный нарушитель — инсайдер. Он уже внутри.</li>',
            '<li>APT-атаки невозможно предотвратить полностью — цель обнаружить и ограничить ущерб.</li>',
            '<li>91% атак начинается с фишинга — обучение пользователей критически важно.</li>',
            '<li>Правило 3-2-1 для бэкапов: три копии, два типа носителей, одна вне площадки.</li>',
            '</ul>',

            '<hr style="border:1px solid var(--border);margin:24px 0;">',

            '<h3>🛠 Инструменты</h3>',
            '<p>Для практической проверки URL и QR-кодов используйте:</p>',
            '<ul>',
            '<li><strong>QR Guard Pro</strong> — анализатор безопасности QR-кодов. Проверяет URL через 6 сервисов. <a href="https://qrguard-production-4a89.up.railway.app" target="_blank">Веб-версия</a> · Бот <a href="https://t.me/KernelSecurityBot" target="_blank">@KernelSecurityBot</a></li>',
            '</ul>',

            '<hr style="border:1px solid var(--border);margin:24px 0;">',

            '<h3>📡 Канал</h3>',
            '<p>Больше разборов по ИБ: <a href="https://t.me/kernelsfu" target="_blank">@kernelsfu</a></p>'
        ].join('');
    }
});
