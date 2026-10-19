import { useNavigate } from 'react-router-dom';
export function Home() { const navigate = useNavigate(); return <section className="page home-page"><p className="kicker">VISUAL CREATOR · SOFTWARE ENGINEERING</p><h1>我拍片，<br />也写代码。</h1><p>Jerry Yuan 的作品、手记，和一些正在发生的事。</p><button className="primary" onClick={() => navigate('/works')}>查看作品集 →</button></section>; }
