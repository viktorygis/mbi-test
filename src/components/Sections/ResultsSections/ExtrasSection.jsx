import React from 'react';

const ExtrasSection = ({ onRetakeTest }) => (
	<div className="extras">
		<div className="extras__container">

			{/* Запись на консультацию ------------------ */}
			<section className="extras__section extras__consultation">
				<h2 className="extras__title">📅 Записаться на консультацию</h2>
				<div className="extras__body">
					<p className="extras__text">
						Хотите получить индивидуальные рекомендации или задать вопросы?		</p>
					<p className="extras__text">Запишитесь на консультацию:
					</p>
					<a className="extras__button patterns-button" href="https://ai4g.ru/serf-session.html" target="_blank" rel="noopener noreferrer">
						Записаться
					</a></div>
			</section>

			{/* Контакты -------------------------*/}
			<section className="extras__section extras__contacts">
				<h2 className="extras__title">☎️ Контакты</h2>
				<div className="extras__contacts-body">
					{/*  Контакты автора проекта */}
					<div className="extras__contacts-block">
						<p><b>Автор проекта <i>Елена Семенова</i>:</b></p>
						<ul>
							<li>Телефон: <a href="tel:+79169601863">+7 916 960 1863</a></li>
							<li>Ник в телеграм: <a href="https://t.me/SemenovaElena" target="_blank" rel="noopener noreferrer">@SemenovaElena</a></li>
							<li>Email: <a href="mailto:es@ai4g.ru">es@ai4g.ru</a></li>
							<li>Сайт: <a href="https://www.coachsemenova.com" target="_blank" rel="noopener noreferrer">www.coachsemenova.com</a></li>
						</ul>
					</div>

					{/*  Контакты администратора и проекта */}
					<div className="extras__contacts-block">
						<p><b>Администратор проекта:</b></p>
						<ul>
							<li>Сергей Ковальчук: <a href="tel:+79657536693">+7 965 753 6693</a></li>
							<li>Ник в телеграм: <a href="https://t.me/smkovalchuk" target="_blank" rel="noopener noreferrer">@smkovalchuk</a></li>
						</ul>
					</div>

					{/* Контакты проекта */}
					<div className="extras__contacts-block">
						<p><b>Наш проект AI4G:</b></p>
						<ul>
							<li>Сайт: <a href="https://ai4g.ru" target="_blank" rel="noopener noreferrer">www.ai4g.ru</a></li>
							<li>Email: <a href="mailto:info@ai4g.ru">info@ai4g.ru</a></li>
							<li>Канал в телеграм: <a href="https://t.me/life_watch" target="_blank" rel="noopener noreferrer">@life_watch</a></li>
						</ul>
					</div>
				</div>

			</section>

			{/* Повторное тестирование ---------------- */}
			<section className="extras__section extras__retake-test">
				<h2 className="extras__title">🔁 Пройти тест повторно</h2>
				<div className="extras__body">
					<p className="extras__text">
						Если хотите пройти тест еще раз — просто нажмите на кнопку. 					</p>

					<p className="extras__text">
						Мы рекомендуем делать это не чаще одного раза в 3 месяца.
					</p>
					<button className="extras__button patterns-button" onClick={onRetakeTest}>
						Пройти тест повторно
					</button></div>
			</section>

			{/* Поделиться тестом -------------------*/}
			<section className="extras__section extras__share-test">
				<h2 className="extras__title">📢 Поделиться тестом с друзьями</h2>
				<div className="extras__body">
					<p className="extras__text">Рекомендуйте тест знакомым — отправьте им ссылку или воспользуйтесь кнопками ниже:</p>
					<SocialShare />

				</div>
			</section>

			{/* Полезные материалы*/}
			<section className="extras__section extras__materials">
				<h2 className="extras__title">📝 Полезные материалы</h2>
				<ul className="extras__materials-list">
					<li className="extras__materials-item">
						<a className="extras__materials-link" href="https://ai4g.ru/patterns.html" target="_blank" rel="noopener noreferrer">

							<img src="/img/test-mbi/materials/materials01.jpg" alt="" />
							<h3>О профессиональном выгорании</h3>
							<p>Признаки, причины и последствия синдрома выгорания. Как распознать выгорание на ранних стадиях.</p>
						</a>
					</li>
					<li className="extras__materials-item">
						<a className="extras__materials-link" href="https://ai4g.ru/vozmozhnosti.html" target="_blank" rel="noopener noreferrer">
							<img src="/img/test-mbi/materials/materials02.jpg" alt="" />
							<h3>Профилактика выгорания</h3>
							<p>Практические рекомендации и техники для восстановления ресурсов и предотвращения выгорания.</p>
						</a>
					</li>
					<li className="extras__materials-item">
						<a className="extras__materials-link" href="https://ai4g.ru/technics.html" target="_blank" rel="noopener noreferrer">
							<img src="/img/test-mbi/materials/materials03.jpg" alt="" />
							<h3>Техники самовосстановления</h3>
							<p>Методы и подходы, которые помогут восстановить эмоциональные ресурсы и повысить устойчивость к стрессу.</p>
						</a>
					</li>

					<li className="extras__materials-item">
						<a className="extras__materials-link" href="https://t.me/life_watch" target="_blank" rel="noopener noreferrer">
							<img src="/img/test-mbi/materials/materials04.jpg" alt="" />

							<h3>Канал проекта в Telegram</h3>
							<p>Полезные статьи, советы и материалы о психологическом благополучии и профессиональном развитии.</p>
						</a>
					</li>


				</ul>


			</section>

			{/* Автор проекта */}
			<section className="extras__section extras__author">
				<h3 className="extras__title">🏆 Автор проекта</h3>
				<h4 className="extras__subtitle">Елена Семенова</h4>
				<div className="extras__block">
					<ul>
						<li>Коуч, карьерный консультант, эксперт по управлению репутацией.</li>
						<li>
							<b>Образование:</b> Окончила университет по специальности биология; РАГС при Президенте РФ по специальностям психология, управление персоналом; АНХ при Правительстве РФ по направлению менеджмент.
						</li>
						<li>Прошла профессиональную переподготовку по психодиагностике (Институт Психологии РАН), медицинской психологии (Центр им В.П. Сербского).</li>
						<li>Более 30 лет экспертизы в области работы с людьми. Опыт работы в ИТ, финансах и промышленности (ЗГД по оргразвитию и персоналу, операционный директор, управляющий директор).</li>
						<li>
							<b>Клиенты:</b> собственники компаний, CEO, топ-менеджеры, высшие должностные лица (первые и вторые лица муниципального и гос управления уровня мэров городов, губернаторов, министров и заместителей министров).
						</li>
						<li>
							<b>Компании:</b> Сбербанк, Банк «Открытие», Альфа групп, Газпроммедиагрупп, Север групп, Ренова, Колмар, ПЭК, ПКБ, Первая Линия, Правительство Москвы, Татарстана, Башкирии.
						</li>
						<li>
							<b>Благотворительные фонды:</b> Фонд президентских грантов, Фонд Потанина.
						</li>
						<li>
							<b>Основные места работы:</b> Allianz, Информзащита; Газтехлизинг, Энвижн Груп (группа МТС), Ангара технологии, промышленная группа ПАО Соллерс.
						</li>
						<li>Эксперт по оценке и развитию людей, сертифицирована по инструментам Hogan, Gallup и др.</li>
					</ul>
				</div>
			</section>

		</div>
	</div>
);

const SocialShare = () => (
	<>

		<p className="extras__text">
			<b>Поделиться ссылкой на тестирование:		</b>
		</p>
		<div className="share__block">
			<SocialButton
				title="telegram"
				href="https://t.me/share/url?url=https://ai4g.ru/test-mbi&text=Пройдите%20тест%20MBI%20на%20определение%20уровня%20профессионального%20выгорания!%20Узнайте%20свои%20показатели%20по%20шкалам%20истощения,%20деперсонализации%20и%20редукции%20личных%20достижений."
				icon="telegram.svg"
				alt="Telegram"
			/>
			<SocialButton
				title="whatsapp"
				href="https://api.whatsapp.com/send?text=Пройдите%20тест%20MBI%20на%20определение%20уровня%20профессионального%20выгорания.%20Ссылка:%20https://ai4g.ru/test-mbi"
				icon="whatsapp.svg"
				alt="WhatsApp"
			/>
		</div>
	</>
);

const SocialButton = ({ title, href, icon, alt }) => (
	<a className="share__button" title={title} target="_blank" rel="noopener noreferrer" href={href}>
		<img src={`/img/test-mbi/${icon}`} alt={alt} />
	</a>
);
export default ExtrasSection;