export default function Loading() {
	return (
		<div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
			<div className="bg-white rounded-2xl shadow-md overflow-hidden">
				<div className="w-full h-72 bg-gray-200" />
				<div className="p-8 space-y-4">
					<div className="h-6 bg-gray-200 rounded w-1/2" />
					<div className="h-4 bg-gray-200 rounded w-full" />
					<div className="h-4 bg-gray-200 rounded w-full" />
					<div className="h-4 bg-gray-200 rounded w-3/4" />
				</div>
			</div>
		</div>
	);
}
