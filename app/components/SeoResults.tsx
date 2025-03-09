{seoImprovements && seoImprovements.map((improvement, index) => (
  <div key={index} className="flex items-start mb-4">
    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
      <CheckIcon className="w-4 h-4 text-green-500" />
    </div>
    <p className="text-gray-700">
      {improvement.replace(/^Friendly"/, "Friendly")}
    </p>
  </div>
))} 