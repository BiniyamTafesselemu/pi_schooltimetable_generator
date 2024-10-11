export default function TranscationCard({ packageName, subscription, amount, date }) {
    return (
        <div>
            <div className="flex justify-between sm:justify-normal bg-white border border-black rounded-md mb-1 p-3 hover:bg-purple-200">
                <h1 className="w-[35%] flex justify-start">{packageName}</h1>
                <h1 className="w-[35%] flex justify-center">{subscription}</h1>
                <h1 className="w-[35%] flex justify-center">{amount}</h1>
                <h1 className="w-[35%] flex justify-end">{date}</h1>
            </div>
        </div>
    );
}