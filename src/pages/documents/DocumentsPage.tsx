import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FileText, Upload, Download, Trash2, Share2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const DocumentsPage = () => {
  const initialDocuments = [
    { id: 1, name: 'Pitch Deck 2024.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2024-02-15', shared: true },
    { id: 2, name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2024-02-10', shared: false },
    { id: 3, name: 'Business Plan.docx', type: 'Document', size: '3.2 MB', lastModified: '2024-02-05', shared: true },
    { id: 4, name: 'Market Research.pdf', type: 'PDF', size: '5.1 MB', lastModified: '2024-01-28', shared: false }
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [showSignature, setShowSignature] = useState<Record<string, boolean>>({});
  const signatureRefs = useRef<Record<string, SignatureCanvas>>({});

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: documents.length + index + 1,
        name: file.name,
        type: file.type.split('/')[1] || 'File',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        shared: false
      }));

      setDocuments(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => {
        setStatuses(prev => ({ ...prev, [file.name]: 'Draft' }));
        setShowSignature(prev => ({ ...prev, [file.name]: false }));
      });
    }
  };

  const changeStatus = (fileName: string, status: string) => {
    setStatuses(prev => ({ ...prev, [fileName]: status }));
  };

  const clearSignature = (fileName: string) => {
    signatureRefs.current[fileName]?.clear();
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <label>
          <input type="file" multiple className="hidden" onChange={handleFileUpload} />
          <Button leftIcon={<Upload size={18} />}>Upload Document</Button>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Recent Files</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Shared with Me</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Starred</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Trash</button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Sort by</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex flex-col border p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <FileText size={24} className="text-primary-600" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                        {doc.shared && <Badge variant="secondary" size="sm">Shared</Badge>}
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-yellow-500 px-2 py-1 rounded text-white" onClick={() => changeStatus(doc.name, "In Review")}>In Review</button>
                        <button className="bg-green-500 px-2 py-1 rounded text-white" onClick={() => changeStatus(doc.name, "Signed")}>Signed</button>
                        <button className="bg-blue-500 px-2 py-1 rounded text-white" onClick={() => setShowSignature(prev => ({ ...prev, [doc.name]: !prev[doc.name] }))}>
                          {showSignature[doc.name] ? "Hide Signature" : "Add Signature"}
                        </button>
                      </div>
                    </div>

                    {/* Signature Pad */}
                    {showSignature[doc.name] && (
                      <div className="border p-2">
                        <SignatureCanvas
                          ref={ref => { if (ref) signatureRefs.current[doc.name] = ref; }}
                          penColor="black"
                          canvasProps={{ width: 400, height: 150, className: "border" }}
                        />
                        <button className="mt-2 bg-red-500 px-2 py-1 rounded text-white" onClick={() => clearSignature(doc.name)}>Clear</button>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <span>Modified {doc.lastModified}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Download"><Download size={18} /></Button>
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Share"><Share2 size={18} /></Button>
                      <Button variant="ghost" size="sm" className="p-2 text-error-600 hover:text-error-700" aria-label="Delete"><Trash2 size={18} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};