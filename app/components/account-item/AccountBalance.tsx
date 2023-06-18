
export default function AccountBalance({ fullName, amount, balance }: { fullName: string, balance: number, amount: number }) {
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 border border-gray-200 rounded-lg shadow p-5">
                <div className="flex-1 min-w-0 ">
                    <p className="text-xl text-gray-900 truncate font-bold dark:text-white mb-2">
                        {fullName}
                    </p>
                </div>
                <div className="flex flex-col align-bottom">
                    <p className="inline-flex justify-end items-center text-base text-gray-900 dark:text-white text-end">
                        Total spent :&nbsp;
                        <span className="font-bold">{amount}€</span>
                    </p>
                    <p className={`inline-flex justify-end items-center text-base font-semibold ${balance > 0 ? "text-[#50d71e]" : "text-[#d71e1e]"}`}>
                        Accounting balance :&nbsp;
                        <span className="font-bold">{balance > 0 && "+"}{balance}€</span>
                    </p>
                </div>
            </div>
        </li>
    )
}


