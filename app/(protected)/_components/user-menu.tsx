import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "./logout-button";
import ThemeSwitcher from "@/components/ui/theme-switcher";

export default function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
          <Avatar className="size-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-orange-400">BS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>username</span>
            <span>email@email.com</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 text-sm">
        <div className="flex h-10 items-center justify-between py-1 pl-2 pr-1">
          Тема
          <ThemeSwitcher />
        </div>
        <Separator />
        <div className="flex h-10 items-center p-1">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
