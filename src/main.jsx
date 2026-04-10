//main.jsx - точка входа в приложение, где мы рендерим основной компонент App внутри BrowserRouter для обеспечения маршрутизации. Здесь мы также импортируем глобальные стили и используем StrictMode для выявления потенциальных проблем в приложении. Этот файл служит отправной точкой для всего приложения и обеспечивает его правильную инициализацию.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/main.scss';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
