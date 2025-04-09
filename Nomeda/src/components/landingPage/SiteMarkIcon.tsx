import SvgIcon from '@mui/material/SvgIcon';

export default function TaskManagerIcon() {
  return (
    <SvgIcon
      sx={{
        height: 40,
        width: 150,
        mr: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 60"
        fill="none"
      >
        {/* Background Rectangle */}
        <rect
          x="0"
          y="0"
          width="200"
          height="60"
          rx="10"
          fill="transparent"
        />
        {/* Text: Nomeda Task-Hub */}
        <text
          x="100"
          y="40"
          textAnchor="middle"
          fill="#d32f2f"
          fontFamily="Arial, sans-serif"
          fontSize="26"
          fontWeight="bold"
        >
          Nomeda Task-Hub
        </text>
      </svg>
    </SvgIcon>
  );
}