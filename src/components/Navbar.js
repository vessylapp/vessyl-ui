import Link from 'next/link'
import { Chip, Button} from "@nextui-org/react";
import {checkForUpdates} from "@/funcs/status"
import {isLoggedIn} from "@/funcs/isLoggedIn";

export default async function Navbar() {
    const {update, version} = await checkForUpdates();
    const loggedIn = await isLoggedIn();

    return (
        <nav className="w-full flex items-center justify-between p-6 z-50">
            <div className="text-2xl">
                <Link href="/" className="hover:text-yellow-500 transition-all duration-300">
                    Vessyl
                </Link>
                {update ? (
                    <Chip
                        color="warning"
                        className={"ml-5"}
                        variant="solid">
                        Update Available
                    </Chip>
                ) : (
                    <Chip
                        variant="faded"
                        className={"ml-5"}
                        color="success"
                    >
                        {version}
                    </Chip>
                )}
            </div>
            <div className="flex space-x-4">
                {loggedIn ? (
                    <Link href="/dashboard">
                        <Button size="small" auto>
                            Settings
                        </Button>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Button size="small" auto>
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}