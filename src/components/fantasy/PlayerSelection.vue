<template>
    <div
        class="player-selection bg-color-2 p-4 shadow-lg h-full overflow-y-auto text-gray-200 mt-2 mb-4 rounded-lg shadow-xl">
        <h2 class="text-xl font-bold mb-4">Player Selection</h2>
        <div class="flex flex-wrap gap-4 mb-4">
            <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100">View</label>
                <select
                    class="p-2 border-b-2 border-gray-300 rounded w-full text-gray-600 focus:outline-none focus:border-blue-500">
                    <option>View</option>
                    <option>GoalKeeper</option>
                    <option>Defenders</option>
                    <option>Midfielders</option>
                    <option>Forwards</option>
                </select>
            </div>
            <div class="flex-1 min-w-[100px]">
                <label class="block mb-1 text-gray-100">Sorted by</label>
                <select
                    class="p-2 border-b-2 border-gray-300 rounded w-full text-gray-600 focus:outline-none focus:border-blue-500">
                    <option>Sorted by</option>
                    <option>Total points</option>
                    <option>Price</option>
                </select>
            </div>
        </div>

        <div class="mb-4">
            <input type="number" placeholder="Max cost" class="p-2 border rounded w-full text-gray-600">
        </div>
        <div class="mb-4 p-2 border-b flex justify-between">
            <input type="text" placeholder="Search for player..." class="p-2 border rounded w-full text-gray-600">
        </div>



        <div class="ElementList__ElementTypeButtonWrap-j2itt6-2 lhOTVB"><button
                class="ElementList__ElementTypeButton-j2itt6-3 ffmiMs">
                <div class="TabHeading__TabHeadingOuter-sc-1wos76v-0 dbiWsa">
                    <div class="TabHeading__TabHeadingInner-sc-1wos76v-1 jhdCIq">
                        <h3 class="TabHeading__TabHeadingTitle-sc-1wos76v-2 kVZXCD">Defenders</h3>
                    </div>
                </div>
            </button></div>
        <table class="Table-ziussd-1 ElementTable-sc-1v08od9-0 dUELIG OZmJL">
            <thead>
                <tr>
                    <th scope="col" class="ElementList__ElementListStatus-j2itt6-4 evPKp">&nbsp;</th>
                    <th scope="col" class="ElementList__ElementListElement-j2itt6-5 bGdijW">&nbsp;</th>
                    <th scope="col" class="ElementList__ElementListPrice-j2itt6-6 gNayOu">£</th>
                    <th scope="col" class="ElementList__ElementListStat-j2itt6-7 dvUKqQ">**</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="ElementTable__ElementRow-sc-1v08od9-3 ElementListRow__StyledElementListRow-sc-122fdeq-0 kGMjuJ">
                    <td class="ElementTable__BorderedCell-sc-1v08od9-4 lpmEgf"><button
                            class="ElementDialogButton__StyledElementDialogButton-sc-1vrzlgb-0 jVAeGl">
                            <div class="ElementStatus__InfoIcon-sc-1bs5tgy-0 dtQAX"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="6" height="13" viewBox="0 0 6 13">
                                    <path
                                        d="M2.22454008,4.81004082 C2.04454008,5.29122857 1.86734808,5.7178898 1.72391208,6.156 C1.26547608,7.55608163 0.79016808,8.95126531 0.37907208,10.3661633 C0.14141208,11.1840857 0.47704128,11.7369796 1.18250808,11.838 C1.43938008,11.8748302 1.71688008,11.8733951 1.96813608,11.8150408 C3.51877608,11.4548694 4.20733608,10.1739796 4.91521608,8.91887755 C4.76334408,9.03175959 4.64147208,9.17573878 4.51255608,9.31301633 C4.11552408,9.7358449 3.67396008,10.0969714 3.12319608,10.2887878 C3.03319608,10.3198788 2.89960008,10.305529 2.82272808,10.2548278 C2.78194728,10.228042 2.80397808,10.0725869 2.8269468,9.98313796 C2.8569468,9.86451551 2.9160096,9.75306857 2.9624148,9.63827265 C3.5652228,8.14782367 4.1759748,6.66080327 4.7638548,5.16410939 C4.865574,4.90486041 4.9325988,4.59873796 4.9058868,4.32609306 C4.8566676,3.82768898 4.3424508,3.47564816 3.7124508,3.48904408 C2.0769708,3.52348286 0.8985708,4.35097469 0.0595308,5.74002367 C0.0285936,5.79120367 0.0285936,5.86151633 0,5.98253388 C0.698436,5.45686041 1.27548,4.82070122 2.22468,4.81018286 L2.22454008,4.81004082 Z M5.82634008,1.5717551 C5.82634008,2.43941633 5.13680808,3.14302041 4.28602008,3.14302041 C3.43571208,3.14302041 2.74618008,2.43941633 2.74618008,1.5717551 C2.74618008,0.703616327 3.43571208,0 4.28602008,0 C5.13679608,0 5.82634008,0.703604082 5.82634008,1.5717551"
                                        transform="translate(0 .5)"></path>
                                </svg></div><span class="Utils__VisuallyHidden-sc-1cvr1yj-2 dNLdnR">View player
                                information</span>
                        </button></td>
                    <td class="ElementTable__BorderedCell-sc-1v08od9-4 lpmEgf"><button
                            class="ElementInTable__MenuButton-y9xi40-0 dSPKUY">
                            <div class="Media__StyledMedia-sc-94ghy9-0 WvNic">
                                <div class="Media__Img-sc-94ghy9-1 jaVBnm">
                                    <picture>
                                        <source type="image/webp" sizes="24px"><img src="/public/assets/team/t1.png"
                                            sizes="24px" alt="Arsenal" class="Shirt__StyledShirt-k5q8zl-0 gXDDOq">
                                    </picture>
                                </div>
                                <div class="Media__Body-sc-94ghy9-2 eflLUc">
                                    <div class="ElementInTable__Name-y9xi40-1 heNyFi">Cédric</div>
                                    <div class="ElementInTable__Info-y9xi40-2 XzKWB"><span
                                            class="ElementInTable__Team-y9xi40-3 hosEuf">ARS</span><span>DEF</span>
                                    </div>
                                </div>
                            </div>
                        </button></td>
                    <td>3.8</td>
                    <td>3</td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script>
export default {
    name: 'PlayerSelection'
}
</script>

<style>
.bg-color-2 {
    background-color: #261442;
}
</style>