
export default function AccountExpenditure({ fullName, category, date, amount }: { fullName: string, category: string, date: string, amount: number }) {
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 border border-gray-200 rounded-lg shadow p-5">
                <div className="flex-1 min-w-0 ">
                    <p className="text-xl text-gray-900 truncate dark:text-white mb-2">
                        {fullName}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{date}</div>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {category}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {amount}€
                </div>
            </div>
        </li>
    )
}
