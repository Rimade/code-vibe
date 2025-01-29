import { QuickActionType } from '@/lib/constants';
import { Card } from '../ui/card';

interface ActionCardProps {
	action: QuickActionType;
	onClick: () => void;
}
// tailwind bugs
// from-sky-600/20 via-green-500/10 to-transparent
// from-teal-400/20 via-blue-400/10 to-transparent
// from-indigo-500/20 via-indigo-500/10 to-transparent
// from-blue-600/20 via-blue-600/10 to-transparent
// from-rose-500/20 via-rose-500/10 to-transparent
// from-sky-500/10 via-rose-400/20 to-transparent

export function ActionCard({ action, onClick }: ActionCardProps) {
	return (
		<Card
			className={`group relative overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer hover:scale-[1.02] duration-300`}
			onClick={onClick}>
			{/* ACTION GRADIENT */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-50 transition-opacity`}
			/>

			{/* ACTION CONTENT WRAPPER */}
			<div className="relative p-6 size-full">
				<div className="space-y-3">
					{/* ACTION ICON */}
					<div
						className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10 group-hover:scale-110 hover:rotate-[30deg] transition-transform duration-500 will-change-transform`}>
						<action.icon
							className={`h-6 w-6 ${action.color.startsWith('#') ? '' : `text-${action.color}`}`}
							style={action.color.startsWith('#') ? { color: action.color } : {}}
						/>
					</div>

					{/* ACTION DETAILS */}
					<div className="space-y-1">
						<h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
							{action.title}
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{action.description}
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
