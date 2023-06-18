import { HttpMethod, Ressource } from "@/app/types/helpers";
import { callApi } from "@/app/utils/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function ExpenditureCreateForm({ close, reloadData }: { close: () => void, reloadData: () => void; }) {

    const [userList, setUserList] = useState([]);
    const [expenditureCategoryList, setExpenditureCategoryList] = useState([]);
    const [selectedExpenditureCategory, setSelectedExpenditureCategory] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInputError, setAmountInputError] = useState(false);

    useEffect(() => {
        // Récupération de la liste des utilisateurs  
        fetchUserList();
        // Récupération de la liste des catégories
        fetchExpenditureCategoryList();
    }, [])

    const fetchUserList = async () => {
        const userListFetched = await callApi(Ressource.Users, HttpMethod.Get);
        setUserList(userListFetched);
        setSelectedUser(userListFetched[0].id);
    };

    const fetchExpenditureCategoryList = async () => {
        const expenditureCategorieListFetched = await callApi(Ressource.ExpenditureCategories, HttpMethod.Get);
        setExpenditureCategoryList(expenditureCategorieListFetched);
        setSelectedExpenditureCategory(expenditureCategorieListFetched[0].id);
    };

    const handleChangeSelectedUser = (e: ChangeEvent<HTMLInputElement>) => {
        // Gestion de la modification de la valeur du champs user
        setSelectedUser(e.target.value)
    }

    const handleChangeSelectedExpenditureCategory = (e: ChangeEvent<HTMLInputElement>) => {
        // Gestion de la modification de la valeur du champs expenditureCategory
        setSelectedExpenditureCategory(e.target.value)
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Gestion de la modification de la valeur du champs montant
        const { value: inputAmountValue } = e.target
        const regex = /^[0-9]{0,6}$/;
        setAmountInputError(!regex.test(inputAmountValue))
        setAmount(inputAmountValue)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Gestion de la soumission du formulaire
        if (amountInputError === false) {
            const todayDate = new Date().toISOString().slice(0, 10);
            await callApi(
                Ressource.Expenditures,
                HttpMethod.Post,
                null,
                {
                    date: todayDate,
                    amount: parseInt(amount),
                    userId: parseInt(selectedUser),
                    expenditureCategoryId: parseInt(selectedExpenditureCategory)
                }
            )
            // On recharge les données du parent
            reloadData();
            // Fermeture de la popup
            close();
        }
    }

    return (
        <div className="fixed inset-0 mt-20">
            <div className="w-full flex justify-center mt-8">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex">
                        <h2 className="text-2xl text-gray-900 dark:text-white mb-5 text-center font-bold">Add expenditure</h2>
                        <button
                            onClick={close}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            className={
                                (amountInputError)
                                    ? `bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500`
                                    : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`
                            }
                            id="amount"
                            type="text"
                            placeholder="Loisir"
                            onChange={handleAmountChange} value={amount}
                        />
                        {amountInputError
                            && <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                Le montant doit être un nombre entre 0 et 100 000
                            </p>
                        }
                    </div>
                    {userList.length !== 0 &&
                        <div className="mb-4">
                            <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an user</label>
                            <select
                                value={selectedUser}
                                onChange={handleChangeSelectedUser}
                                id="users"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                {userList.map(userItem =>
                                    <option value={userItem.id} key={userItem.id}>{userItem.firstName} {userItem.lastName}</option>
                                )}
                            </select>
                        </div>
                    }
                    {expenditureCategoryList.length !== 0 &&
                        <div className="mb-4">
                            <label htmlFor="expenditureCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an expenditure category</label>
                            <select
                                value={selectedExpenditureCategory}
                                onChange={handleChangeSelectedExpenditureCategory}
                                id="expenditureCategory"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                {expenditureCategoryList.map(expenditureCategoryItem =>
                                    <option value={expenditureCategoryItem.id} key={expenditureCategoryItem.id}>{expenditureCategoryItem.name}</option>
                                )}
                            </select>
                        </div>
                    }
                    <div className="flex items-center justify-center mt-10">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}