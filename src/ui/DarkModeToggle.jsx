import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"


function DarkModeToggle() {

  const { isDarkMode, toggleIsDarkMode } = useDarkMode()

  return (
    <ButtonIcon onClick={toggleIsDarkMode} >
   {    isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon/>}
    </ButtonIcon>
  )
}

export default DarkModeToggle