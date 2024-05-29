<template>
    <div>
        <div class="  rounded-xl shadow-lg  min-h-screen  bg-white">
            <div class="p-4 overflow-scroll px-0">
                <table class="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    Transaction</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    Amount</p>
                            </th>
                            <th class="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <p
                                    class="block antialiased font-sans text-xs text-blue-gray-900 font-normal leading-none opacity-70">
                                    Date</p>
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="p-1 border-b border-blue-gray-50">
                                <div class="flex items-center gap-3">
                                    <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg"
                                        alt="Spotify"
                                        class="inline-block relative object-center !rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                                    <p
                                        class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                        Spotify</p>
                                </div>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                    $2,500</p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                    Wed 3:00pm</p>
                            </td>

                        </tr>
                        <tr>
                            <td class="p-1 border-b border-blue-gray-50">
                                <div class="flex items-center gap-3">
                                    <img src="https://docs.material-tailwind.com/img/logos/logo-amazon.svg" alt="Amazon"
                                        class="inline-block relative object-center !rounded-full w-8 h-8 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                                    <p
                                        class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-bold">
                                        Amazon</p>
                                </div>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                    $5,000</p>
                            </td>
                            <td class="p-1 border-b border-blue-gray-50">
                                <p
                                    class="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                                    Wed 1:00pm</p>
                            </td>

                        </tr>
                    </tbody>
                </table>
                <div class="w-full pt-5 px-4 mb-8 mx-auto ">
                    <!-- component -->
                    <div class="flex flex-col items-center my-12">
                        <div class="flex text-gray-700">
                            <div
                                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-left w-6 h-6">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                            <div class="flex h-12 font-medium rounded-full bg-gray-200">
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    1</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-teal-600 text-white ">
                                    2</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    3</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    ...</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    13</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    14</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    15</div>
                                <div
                                    class="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">
                                    2</div>
                            </div>
                            <div
                                class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right w-6 h-6">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center my-12">
                        <div class="flex text-gray-700">
                            <div
                                class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-left w-6 h-6">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                            <div class="flex h-12 font-medium rounded-full bg-gray-200">
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    1</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    ...</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    2</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-teal-600 text-white ">
                                    3</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    4</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    ...</div>
                                <div
                                    class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    15</div>
                                <div
                                    class="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-teal-600 text-white">
                                    3</div>
                            </div>
                            <div
                                class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right w-6 h-6">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="text-2xl text-center">Small</div>

                    <div class="flex flex-col items-center my-12">
                        <div class="flex text-gray-700">
                            <div
                                class="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                            <div class="flex h-8 font-medium rounded-full bg-gray-200">
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    1</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    ...</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    3</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-pink-600 text-white ">
                                    4</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    5</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    ...</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">
                                    15</div>
                                <div
                                    class="w-8 h-8 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-pink-600 text-white">
                                    4</div>
                            </div>
                            <div
                                class="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div class="flex flex-col items-center my-12">
                        <div class="flex text-gray-700">
                            <div class="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </div>
                            <div class="flex h-8 font-medium ">
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    1</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-orange-600  ">
                                    2</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    3</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    ...</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    13</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    14</div>
                                <div
                                    class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
                                    15</div>
                                <div
                                    class="w-8 h-8 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-orange-600">
                                    2</div>
                            </div>
                            <div class="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>