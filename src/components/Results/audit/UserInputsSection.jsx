import React from 'react'


const UserInputsSection = ({
  rawEntries,
}) => {
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div className="border-b border-white/10 p-6">

        <h2 className="text-xl font-semibold">
          Your Submitted Inputs
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Original audit data provided by your team
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-white/5">

            <tr className="text-left text-sm text-gray-400">

              <th className="px-6 py-4 font-medium">
                Tool
              </th>

              <th className="px-6 py-4 font-medium">
                Plan
              </th>

              <th className="px-6 py-4 font-medium">
                Use Case
              </th>

              <th className="px-6 py-4 font-medium">
                Team Size
              </th>

              <th className="px-6 py-4 font-medium">
                Seats
              </th>

              <th className="px-6 py-4 font-medium">
                Monthly Spend
              </th>

            </tr>
          </thead>

          <tbody>

            {rawEntries.map((item) => (

              <tr
                key={item.id}
                className="
                  border-t border-white/5
                  text-sm
                "
              >

                <td className="px-6 py-5 font-medium">
                  {item.tool}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {item.plan}
                </td>

                <td className="px-6 py-5 text-gray-300 capitalize">
                  {item.useCase}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {item.teamSize}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {item.seats || "-"}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  ${Number(item.monthlySpend).toFixed(2)}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInputsSection;
