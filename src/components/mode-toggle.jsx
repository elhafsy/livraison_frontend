import {Moon, Sun} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useTheme} from "@/components/theme-provider"

export function ModeToggle() {
  const {setTheme, theme} = useTheme()

  return (
    <Button variant="ghost" className={'rounded-full border border-black bg-white text-primary'} onClick={setTheme} size="icon">
      {theme === 'light' ?
        <Sun className="h-[1.2rem] w-[1.2rem]rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        :
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100"/>
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
