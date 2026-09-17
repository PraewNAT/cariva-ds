import { render } from '@testing-library/react';
import * as icons from './index';

// Guards the generated DS icons: every Material family ships all five MUI
// styles, every Medical icon ships once, and each one renders a 24×24 SVG that
// inherits colour like any MUI icon.
const STYLES = ['', 'Outlined', 'Rounded', 'Sharp', 'TwoTone'];
const FAMILIES = [
  'AmpStories', 'DockToRight', 'Eco', 'ExposureNeg1', 'ExposureNeg2',
  'ExposurePlus1', 'ExposurePlus2', 'ExposureZero', 'Polymer',
];
// Figma section "Medical" (5406:35089) — single style.
const MEDICAL = [
  'ActivityHeartbeat', 'BabyBottle', 'BabyCarriage', 'Bandage', 'Bike', 'BodyScan', 'Bone', 'Brain',
  'CheckupList', 'ClipboardHeart', 'ClockHeart', 'Coffin', 'CustomEmergencyBed', 'CustomHeartBeat',
  'CustomHome', 'CustomNurese', 'CustomReportMedical', 'CustomStethoscope', 'Dental', 'DeviceWatchHeart',
  'Disabled', 'Disabled2', 'Dna', 'Dna2', 'Ear', 'EarScan', 'EmergencyBed', 'Empathize', 'FaceMask', 'Fall',
  'FingerprintScan', 'FirstAidKit', 'Flask', 'Flask2', 'GenderBigender', 'GenderFemale', 'GenderMale',
  'GenderTransgender', 'Grave', 'HandSanitizer', 'HealthRecognition', 'HeartRateMonitor', 'Heartbeat',
  'Hospital', 'HospitalCircle', 'LineScan', 'Lungs', 'Man', 'Massage', 'MedicalCrossCircle', 'MedicineSyrup',
  'Microscope', 'MoodAnnoyed', 'MoodConfused', 'MoodEmpty', 'MoodHappy', 'MoodNervous', 'MoodSad', 'MoodSmile',
  'MusicHeart', 'Nurse', 'Old', 'Physiotherapist', 'PillCapsule', 'Pills', 'PlayBasketball', 'Prescription',
  'Razor', 'RazorElectric', 'ReportMedical', 'ScaleOutline', 'ScubaDiving', 'Skateboarding', 'Skull',
  'Snowboarding', 'Stethoscope', 'Stretching', 'Swimming', 'TemperatureSnow', 'TemperatureSun', 'Treadmill',
  'UserHeart', 'Vaccine', 'VaccineBottle', 'Waterpolo', 'Wheelchair', 'Woman', 'WorldHeart', 'Yoga',
];

describe('DS custom icons', () => {
  it('exports every Material family in all five styles, every Medical icon, and nothing else', () => {
    const expected = [...FAMILIES.flatMap((f) => STYLES.map((s) => f + s)), ...MEDICAL].sort();
    expect(Object.keys(icons).sort()).toEqual(expected);
  });

  it.each(Object.entries(icons))('%s renders a 24×24 icon with paths', (_, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg!.querySelectorAll('path').length).toBeGreaterThan(0);
    svg!.querySelectorAll('path').forEach((p) => expect(p).not.toHaveAttribute('fill'));
  });

  it('keeps evenodd fill rules so Medical icons keep their cut-outs', () => {
    const { container } = render(<icons.Lungs />);
    expect(container.querySelector('path')).toHaveAttribute('fill-rule', 'evenodd');
  });
});
