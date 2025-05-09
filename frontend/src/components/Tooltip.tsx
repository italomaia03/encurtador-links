type TooltipProps = {
  show: boolean;
}

export const Tooltip = ({ show }: TooltipProps) => {
  if (!show) return null;

  return (
    <div className="absolute -top-8 left-6 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm animate-fade-out">
      Copiado!
      <div className="absolute bottom-0 left-1/2 -mb-1 w-2 h-2 bg-blue-600 transform -translate-x-1/2 rotate-45"></div>
    </div>
  );
};