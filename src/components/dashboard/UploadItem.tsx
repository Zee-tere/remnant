'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UploadCloud, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const AWS_S3_UPLOAD_URL = 'http://localhost:3001/upload';

const uploadToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    console.log('Uploading file:', file.name);
    const response = await fetch(AWS_S3_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Upload response:', data);

    if (!response.ok) {
      throw new Error(`Upload failed: ${data?.message || 'Unknown error'}`);
    }

    return data.url;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Upload error:', error.message);
      toast.error(`Image upload failed: ${error.message}`);
    } else {
      console.error('Unexpected upload error:', error);
      toast.error('An unexpected error occurred during upload.');
    }
    return null;
  }
};



const UploadItem = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [purpose, setPurpose] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setImages((prev) => [...prev, ...fileArray]);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    

    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !description || !category || !location || !condition || !purpose) {
      toast.error('Please fill out all required fields.');
      return;
    }
  
    if (images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
  
    setUploadProgress(10);
  
    const uploadedImageUrls: string[] = [];
    for (const [index, image] of images.entries()) {
      const imageUrl = await uploadToS3(image);
      
      if (imageUrl) {
        uploadedImageUrls.push(imageUrl);
        setUploadProgress(Math.round(((index + 1) / images.length) * 60) + 10); // Real-time progress update
      }
    }
  
    if (uploadedImageUrls.length !== images.length) {
      toast.error(`Some images failed to upload. Only ${uploadedImageUrls.length}/${images.length} uploaded.`);
      return;
    }
  
    setUploadProgress(80);
  
    setTimeout(() => {
      setUploadProgress(100);
      toast.success('Item uploaded successfully!');
      clearForm();
      setStep(1);
    }, 1000);
  };
  

  const clearForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setLocation('');
    setCondition('');
    setPurpose('');
    setImages([]);
    setPreviewUrls([]);
    setUploadProgress(0);
  };

  return (
    <Card className="max-w-2xl w-full mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-neutral-800">Upload New Item</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex flex-col gap-4"
            >
              <Input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Describe the item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{category || 'Select Category'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategory('Electronics')}>Electronics</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Furniture')}>Furniture</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Clothing')}>Clothing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Electronics & Gadgets')}>Electronics & Gadgets</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Furniture & Home Decor')}>Furniture & Home Decor</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Clothing & Fashion')}>Clothing & Fashion</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Vehicles & Auto Parts')}>Vehicles & Auto Parts</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Books & Education')}>Books & Education</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Hobbies & Leisure')}>Hobbies & Leisure</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Sports & Outdoor')}>Sports & Outdoor</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Kitchen & Home Essentials')}>Kitchen & Home Essentials</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Tools & DIY')}>Tools & DIY</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Real Estate & Property')}>Real Estate & Property</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Health & Beauty')}>Health & Beauty</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Pets & Animals')}>Pets & Animals</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Business & Industrial')}>Business & Industrial</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Toys & Games')}>Toys & Games</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Musical Instruments')}>Musical Instruments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Office & Stationery')}>Office & Stationery</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Collectibles & Antiques')}>Collectibles & Antiques</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Baby & Kids')}>Baby & Kids</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Garden & Outdoor')}>Garden & Outdoor</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategory('Event & Party Supplies')}>Event & Party Supplies</DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={nextStep}>Next</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex flex-col gap-4"
            >
              <Input
                type="number"
                placeholder="Price (Optional)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{condition || 'Select Condition'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCondition('New')}>New</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCondition('Used')}>Used</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCondition('Refurbished')}>Refurbished</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{purpose || 'Select Purpose'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPurpose('✅ For Sale')}>✅ Looking to sell</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPurpose('🤝 Trade/barter')}>🤝 Looking to trade/barter</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPurpose('🔄 Donate or give away')}>🔄 Donate or give away</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPurpose('🔧 Fix/repurpose')}>🔧 Looking for someone to fix/repurpose</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPurpose('Recycle')}>Recycle</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={nextStep}>Next</Button>
              <Button variant="outline" onClick={prevStep}>Back</Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex flex-col gap-4"
            >
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neutral-500 transition-all duration-300"
              >
                <UploadCloud className="w-10 h-10 text-neutral-500 mb-2" />
                <p className="text-sm text-neutral-500">Drag & drop images here, or click to select files</p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {previewUrls.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {previewUrls.map((url, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative group w-24 h-24 rounded-lg overflow-hidden border"
                    >
                      <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="bg-green-500 h-2.5 rounded-full"
                  />
                </div>
              )}

              <Button onClick={handleSubmit} className="bg-neutral-800 text-white hover:bg-neutral-700">
                Upload Item
              </Button>
              <Button variant="outline" onClick={prevStep}>Back</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default UploadItem;
