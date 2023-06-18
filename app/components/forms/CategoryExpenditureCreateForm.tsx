'use client'
import { HttpMethod, Ressource } from "@/app/types/helpers";
import { callApi } from "@/app/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CategoryExpenditureCreateForm({ close }: { close: () => void; }) {
    const [newCategory, setNewCategory] = useState('');
    const [categoryInputError, setCategoryInputError] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Gestion de la soumission du formulaire
        if (categoryInputError === false) {
            await callApi(
                Ressource.ExpenditureCategories,
                HttpMethod.Post,
                null,
                { "name": newCategory }
            )
            close();
        }
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Gestion de la modification de la valeur du champs 
        const { value: inputCategoryValue } = e.target
        const regex = /^[a-zA-Z]{2,30}$/;
        setCategoryInputError(!regex.test(inputCategoryValue))
        setNewCategory(e.target.value)
    }

    return (
        <div className="fixed inset-0 mt-20">
            <div className="w-full flex justify-center mt-8">
                <form className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit}>
                    <div className="flex">
                        <h2 className="text-2xl text-gray-900 dark:text-white mb-5 text-center font-bold">Add expenditure category</h2>
                        <button
                            onClick={close}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="category">
                            Category
                        </label>
                        <input
                            className={
                                (categoryInputError)
                                    ? `bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500`
                                    : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`
                            }
                            id="category"
                            type="text"
                            placeholder="Loisir"
                            onChange={handleCategoryChange} value={newCategory}
                        />
                        {categoryInputError
                            && <p className="mt-2 text-sm text-red-600 dark:text-red-500">La catégorie doit être une chaine de caractère entre 2 et 30 caractères</p>
                        }
                    </div>
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