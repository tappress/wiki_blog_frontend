import { Outlet } from 'react-router-dom';


export function LoginLayout() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Outlet/>
    </div>
  )
}
