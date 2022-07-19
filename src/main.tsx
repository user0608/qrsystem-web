import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './routes/App'
// const TestApp = () => {
//   const [proces, setProces] = useState({ loading: true, error: false, message: '' })

//   return (
//     <div>
//       <div className='flex gap-4 px-8'>
//         <button onClick={() => setProces({ loading: true, error: false, message: '' })}>Start</button>
//         <button onClick={() => setProces({ loading: false, error: true, message: 'algo paso y esta cagado' })}>
//           End
//         </button>
//         <button onClick={() => setProces({ loading: false, error: false, message: '' })}>End Sin Error</button>
//       </div>
//       <ProcessInAction {...proces} size='sm'/>
//     </div>
//   )
// }
// const Ic = () => {
//   const notificar = useContext(NotifyContext)
//   return (
//     <button
//       onClick={() =>
//         notificar({
//           message: 'no se pudo completar la operacion',
//           type: 'error',
//         })
//       }
//     >
//       tocame
//     </button>
//   )
// }
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
