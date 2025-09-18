import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: "1.5",
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Logo = () => (
    <svg className="w-auto h-8 text-white" viewBox="0 0 100 40">
        <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="35" fontWeight="bold" fill="currentColor">
            NPO
        </text>
    </svg>
);


export const HomeIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
  </svg>
);

export const InfoIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" />
  </svg>
);

export const NewsIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a1 1 0 0 1 1 -1h3" /><path d="M8 6h8v-2a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2v2" /><path d="M10 14h4" /><path d="M10 18h4" />
    </svg>
);

export const ContactIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
  </svg>
);

export const DashboardIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" />
    </svg>
);
export const UserManagementIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
);

export const ContentIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" />
    </svg>
);

export const AnalyticsIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12m0 1a1 1 0 0 1 -1 -1a1 1 0 0 1 1 -1a1 1 0 0 1 1 1a1 1 0 0 1 -1 1" /><path d="M12 12m0 1a1 1 0 0 1 -1 -1a1 1 0 0 1 1 -1a1 1 0 0 1 1 1a1 1 0 0 1 -1 1" /><path d="M21 12m0 1a1 1 0 0 1 -1 -1a1 1 0 0 1 1 -1a1 1 0 0 1 1 1a1 1 0 0 1 -1 1" /><path d="M4 12h6" /><path d="M13 12h6" />
    </svg>
);

export const SettingsIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
);

export const PaintBrushIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21v-4a4 4 0 0 1 4 -4h4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a2 2 0 0 1 2.8 2.8l-3.4 3.4h-3v-3l3.6 -3.6z" />
    </svg>
);


export const UserIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
);

export const PostIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h16" /><path d="M4 12h16" /><path d="M4 4h16" /><path d="M12 4v16" />
    </svg>
);

export const BellIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
);

export const LogoutIcon = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />
    </svg>
);

export const MenuIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" />
  </svg>
);