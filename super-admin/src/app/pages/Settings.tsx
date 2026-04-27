import { 
  Settings as SettingsIcon, 
  Palette, 
  Type,
  Moon,
  Sun,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Edit2,
  Check,
  Upload,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import logoWhite from "figma:asset/8c94bd8b800ec6b1d118d5cf7e7b9e7cf5b5041d.png";
import logoDark from "figma:asset/82b24db970b77961e949df0e944eeb6e910d202e.png";

const brandColors = [
  { name: "Primary Blue", nameAr: "الأزرق الأساسي", hex: "#2B3D50", usage: "Headers, Icons, Text" },
  { name: "Teal Accent", nameAr: "التركواز الرسمي", hex: "#47CCD0", usage: "Buttons, Highlights, Links" },
  { name: "Black", nameAr: "الأسود", hex: "#000000", usage: "Typography, Numbers" },
  { name: "Background", nameAr: "الخلفية", hex: "#F9FAFB", usage: "Main Background" }
];

const typography = [
  { name: "Noto Kufi Arabic", usage: "Arabic Labels & Content", weight: "Regular, Medium, Bold" },
  { name: "Helvetica", usage: "Numerical Data & English Text", weight: "Light, Regular" }
];

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [editingColor, setEditingColor] = useState<number | null>(null);
  const [colorValues, setColorValues] = useState(brandColors.map(c => c.hex));
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [mainLogo, setMainLogo] = useState<string | null>(null);
  const [lightLogo, setLightLogo] = useState<string | null>(null);
  const [logoUploadMessage, setLogoUploadMessage] = useState<string | null>(null);

  const isDark = theme === 'dark';

  // Apply theme colors to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', colorValues[0]);
    document.documentElement.style.setProperty('--color-accent', colorValues[1]);
    document.documentElement.style.setProperty('--color-text', colorValues[2]);
    document.documentElement.style.setProperty('--color-bg', colorValues[3]);
  }, [colorValues]);

  const handleColorChange = (index: number, newColor: string) => {
    const newValues = [...colorValues];
    newValues[index] = newColor;
    setColorValues(newValues);
  };

  const handleSaveChanges = () => {
    // Save to localStorage
    localStorage.setItem('mzadat-colors', JSON.stringify(colorValues));
    if (mainLogo) localStorage.setItem('mzadat-logo-main', mainLogo);
    if (lightLogo) localStorage.setItem('mzadat-logo-light', lightLogo);
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleResetToDefault = () => {
    setColorValues(brandColors.map(c => c.hex));
    setEditingColor(null);
    setMainLogo(null);
    setLightLogo(null);
    localStorage.removeItem('mzadat-colors');
    localStorage.removeItem('mzadat-logo-main');
    localStorage.removeItem('mzadat-logo-light');
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, logoType: 'main' | 'light') => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setLogoUploadMessage('❌ Please upload an image file');
        setTimeout(() => setLogoUploadMessage(null), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setLogoUploadMessage('❌ File size must be less than 5MB');
        setTimeout(() => setLogoUploadMessage(null), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (logoType === 'main') {
          setMainLogo(result);
        } else {
          setLightLogo(result);
        }
        setLogoUploadMessage('✅ Logo uploaded successfully!');
        setTimeout(() => setLogoUploadMessage(null), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportSettings = () => {
    const settings = {
      theme,
      colors: colorValues,
      mainLogo,
      lightLogo
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mzadat-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          if (settings.colors) setColorValues(settings.colors);
          if (settings.mainLogo) setMainLogo(settings.mainLogo);
          if (settings.lightLogo) setLightLogo(settings.lightLogo);
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-[#2B3D50]">Theme & UI Customization</h1>
        <p 
          className="text-2xl font-light text-gray-600 mt-2"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          إعدادات المظهر والهوية البصرية
        </p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Settings Saved Successfully!</p>
            <p 
              className="text-sm text-green-700"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              تم حفظ الإعدادات بنجاح
            </p>
          </div>
        </div>
      )}

      {/* Theme Mode Selector */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50]">
            Display Mode
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            وضع العرض
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Mode */}
            <button
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className="relative text-left"
            >
              <div className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                theme === "light" ? "border-[#47CCD0]" : "border-gray-300"
              }`}>
                <div className="bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sun className="w-6 h-6 text-[#47CCD0]" />
                    <div>
                      <p className="font-medium text-[#2B3D50]">Light Mode</p>
                      <p 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        الوضع النهاري
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="bg-[#F9FAFB] p-4 flex gap-2">
                  <div className="w-12 h-8 bg-[#47CCD0] rounded"></div>
                  <div className="w-12 h-8 bg-[#2B3D50] rounded"></div>
                </div>
              </div>
              {theme === "light" && (
                <Badge className="absolute top-4 right-4 bg-green-500">Active</Badge>
              )}
            </button>

            {/* Dark Mode - Now Enabled */}
            <button
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className="relative text-left"
            >
              <div className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                theme === "dark" ? "border-[#47CCD0]" : "border-gray-300"
              }`}>
                <div className="bg-[#1a1a1a] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Moon className="w-6 h-6 text-[#47CCD0]" />
                    <div>
                      <p className="font-medium text-white">Dark Mode</p>
                      <p 
                        className="text-sm text-gray-400"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        الوضع الليلي
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] p-4 flex gap-2">
                  <div className="w-12 h-8 bg-[#47CCD0] rounded"></div>
                  <div className="w-12 h-8 bg-[#4a5a6a] rounded"></div>
                </div>
              </div>
              {theme === "dark" && (
                <Badge className="absolute top-4 right-4 bg-green-500">Active</Badge>
              )}
            </button>
          </div>
          
          {theme === "dark" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-1">
                ⚡ Dark Mode Activated
              </p>
              <p 
                className="text-sm text-blue-700"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                سيتم تطبيق الوضع الليلي على جميع صفحات التطبيق
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brand Colors - Now Editable */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#47CCD0]" />
            MZADAT 2026 Brand Colors
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ألوان العلامة التجارية
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandColors.map((color, index) => (
              <div 
                key={`color-${index}`}
                className={`flex items-center gap-4 p-4 border-2 rounded-lg transition-colors ${
                  editingColor === index 
                    ? 'border-[#47CCD0] bg-[#47CCD0]/5' 
                    : 'border-gray-200 hover:border-[#47CCD0]'
                }`}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-lg shadow-sm border-2 border-white cursor-pointer"
                    style={{ backgroundColor: colorValues[index] }}
                    onClick={() => setEditingColor(editingColor === index ? null : index)}
                  ></div>
                  {editingColor === index && (
                    <input
                      type="color"
                      value={colorValues[index]}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#2B3D50]">{color.name}</p>
                    <p 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      ({color.nameAr})
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 font-mono">{colorValues[index].toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{color.usage}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingColor(editingColor === index ? null : index)}
                  className={editingColor === index ? "border-[#47CCD0] bg-[#47CCD0] text-white" : ""}
                >
                  {editingColor === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-4">Color Palette Preview:</p>
            <div className="flex gap-2">
              {colorValues.map((color, index) => (
                <div 
                  key={`preview-${index}`}
                  className="flex-1 h-16 rounded-lg shadow-sm"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <Type className="w-5 h-5 text-[#47CCD0]" />
            Typography System
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            نظام الطباعة
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {typography.map((font, index) => (
              <div 
                key={`font-${index}`}
                className="p-5 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-medium text-[#2B3D50] mb-1">{font.name}</p>
                    <p className="text-sm text-gray-600 mb-2">Usage: {font.usage}</p>
                    <p className="text-xs text-gray-500">Available Weights: {font.weight}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Update
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p 
                    className="text-3xl"
                    style={{ 
                      fontFamily: font.name === "Noto Kufi Arabic" ? "'Noto Kufi Arabic', sans-serif" : "Helvetica, sans-serif" 
                    }}
                  >
                    {font.name === "Noto Kufi Arabic" 
                      ? "مثال على الخط العربي - مزادات"
                      : "Sample Text - MZADAT 2026"}
                  </p>
                  <p 
                    className="text-xl"
                    style={{ 
                      fontFamily: font.name === "Noto Kufi Arabic" ? "'Noto Kufi Arabic', sans-serif" : "Helvetica, sans-serif" 
                    }}
                  >
                    {font.name === "Noto Kufi Arabic" 
                      ? "المملكة العربية السعودية"
                      : "1,234,567 SAR"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logo & Branding */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#47CCD0]" />
            Logo & Brand Assets
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الشعار والأصول البصرية
          </p>
        </CardHeader>
        <CardContent>
          {/* Upload Message */}
          {logoUploadMessage && (
            <div className={`mb-4 p-3 rounded-lg border-2 ${
              logoUploadMessage.includes('✅') 
                ? 'bg-green-50 border-green-500' 
                : 'bg-red-50 border-red-500'
            }`}>
              <p className={`text-sm font-medium ${
                logoUploadMessage.includes('✅') 
                  ? 'text-green-800' 
                  : 'text-red-800'
              }`}>
                {logoUploadMessage}
              </p>
              <p 
                className={`text-xs ${
                  logoUploadMessage.includes('✅') 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {logoUploadMessage.includes('✅') 
                  ? 'تم رفع الشعار بنجاح' 
                  : 'فشل رفع الشعار'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Logo */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-[#47CCD0] transition-colors relative group">
              {mainLogo ? (
                <div className="w-32 h-32 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <img 
                    src={mainLogo} 
                    alt="Main Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={() => setMainLogo(null)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-[#2B3D50] to-[#47CCD0] rounded-lg flex items-center justify-center mb-4">
                  <p 
                    className="text-white text-2xl font-light"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    مزادات
                  </p>
                </div>
              )}
              <p className="text-sm font-medium text-[#2B3D50] mb-1">Main Logo</p>
              <p 
                className="text-xs text-gray-500 mb-3"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                الشعار الرئيسي
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'main')}
                  className="hidden"
                />
                <Button size="sm" variant="outline" className="gap-2 pointer-events-none">
                  <ImageIcon className="w-4 h-4" />
                  Upload New
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                PNG, JPG, SVG (Max 5MB)
              </p>
            </div>

            {/* Secondary Logo */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-[#47CCD0] transition-colors relative group">
              {lightLogo ? (
                <div className="w-32 h-32 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden bg-white border-2 border-[#2B3D50]">
                  <img 
                    src={lightLogo} 
                    alt="Light Background Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={() => setLightLogo(null)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-white border-2 border-[#2B3D50] rounded-lg flex items-center justify-center mb-4">
                  <p className="text-[#2B3D50] text-xl font-light">MZADAT</p>
                </div>
              )}
              <p className="text-sm font-medium text-[#2B3D50] mb-1">Light Background Logo</p>
              <p 
                className="text-xs text-gray-500 mb-3"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                شعار الخلفية الفاتحة
              </p>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'light')}
                  className="hidden"
                />
                <Button size="sm" variant="outline" className="gap-2 pointer-events-none">
                  <ImageIcon className="w-4 h-4" />
                  Upload New
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                PNG, JPG, SVG (Max 5MB)
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2B3D50] mb-1">Logo Placement Guidelines</p>
                <p className="text-xs text-gray-500">Following MZADAT 2026 Identity Standards</p>
              </div>
              <Button size="sm" variant="outline">
                View Guidelines
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* REGA Compliance Notice */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-50/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#2B3D50] rounded-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#2B3D50] mb-2">
                REGA Compliance Notice
              </p>
              <p 
                className="text-sm text-gray-600 mb-3"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                إشعار امتثال هيئة العقار
              </p>
              <p className="text-sm text-gray-700 mb-4">
                All theme customizations must maintain compliance with REGA December 2024 service guide 
                and Infath operational standards. Color contrast ratios, typography sizes, and data clarity 
                requirements are enforced.
              </p>
              <Badge className="bg-[#47CCD0]">Compliance Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-6">
        <Button variant="outline" className="gap-2" onClick={handleResetToDefault}>
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
        <Button className="gap-2 bg-[#47CCD0] hover:bg-[#3EBFBE] text-white" onClick={handleSaveChanges}>
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
        <Button size="sm" variant="outline" className="gap-2" onClick={exportSettings}>
          <Download className="w-4 h-4" />
          Export Settings
        </Button>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="application/json"
            onChange={importSettings}
            className="hidden"
          />
          <Button size="sm" variant="outline" className="gap-2 pointer-events-none">
            <Upload className="w-4 h-4" />
            Import Settings
          </Button>
        </label>
      </div>
    </div>
  );
}