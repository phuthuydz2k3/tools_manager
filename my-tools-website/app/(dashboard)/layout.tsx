"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const DashboardLayout = ({ 
    children 
} : {
    children: React.ReactNode
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn && pathname === '/') {
            router.push('/tools');
        }
    }, [isSignedIn, pathname, router]);

    const handleButtonClick = () => {
        if (pathname === '/create-tool' || pathname.startsWith('/tools/')) {
            router.push('/tools');
        } else {
            router.push('/create-tool');
        }
    };

    const buttonText = pathname === '/create-tool' || pathname.startsWith('/tools/') ? 'Return to Tools' : 'Create Tool';

    return (
        <div className="h-full">
            <div className="h-[80px] fixed inset-y-0 w-full z-50">
                <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-between">
                    <UserButton />
                    <Button onClick={handleButtonClick}>
                        {buttonText}
                    </Button>
                </div>
            </div>
            <main className="pt-[80px] h-full">
                { children }
            </main>
        </div>
    )
}

export default DashboardLayout;