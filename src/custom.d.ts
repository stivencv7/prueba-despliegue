declare namespace JSX {
  interface IntrinsicElements {
    "metamap-button": React.DetailedHTMLProps<
      MetamapButtonProps,
      HTMLButtonElement
    >;
  }
}

interface MetamapButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clientid: string;
  flowid: string;
  color: string;
  textcolor: string;
  icon: ({ className }: { className?: any | undefined }) => JSX.Element;
}
